import { Link, useLocation } from "react-router-dom";
import { Calculator, BookOpen, BookA, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Hesaplamalar", icon: Calculator, to: "/calculations" },
  { label: "Dersler", icon: BookOpen, to: "/lessons" },
  { label: "Sözlük", icon: BookA, to: "/glossary" },
  { label: "Personel", icon: Users, to: "/crew" },
] as const;

export function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-card/90 backdrop-blur-xl safe-area-inset-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  isActive && "drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
                )}
                strokeWidth={isActive ? 2.2 : 1.6}
              />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute -top-px left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
