import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";
import { findParentPath } from "@/hooks/useNavigationHierarchy";

const TOP_LEVEL_ROUTES = new Set(["/", "/calculations", "/lessons", "/crew", "/ship-systems", "/ship-operations", "/beta"]);

export function FloatingNavButtons() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === "/") return null;

  const parent = findParentPath(pathname);
  const isAtTopLevel = TOP_LEVEL_ROUTES.has(pathname);

  return (
    <div className="fixed top-3 left-3 z-50 flex items-center gap-1.5">
      <button
        onClick={() => navigate(parent, { replace: true })}
        aria-label="Geri"
        className="flex items-center gap-1 rounded-full border border-border/40 bg-card/80 px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
      >
        <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
        Geri
      </button>

      {!isAtTopLevel && (
        <button
          onClick={() => navigate("/", { replace: true })}
          aria-label="Ana Sayfa"
          className="flex items-center justify-center w-7 h-7 rounded-full border border-border/40 bg-card/80 text-muted-foreground shadow-sm backdrop-blur-md transition-all hover:border-primary/40 hover:text-foreground active:scale-95"
        >
          <Home className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
