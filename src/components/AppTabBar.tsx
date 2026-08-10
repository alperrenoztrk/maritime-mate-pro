import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BookOpenText,
  Calculator,
  House,
  LibraryBig,
  Search,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hapticSelection } from "@/lib/haptics";
import { isAppChromeHidden } from "@/lib/appChrome";

type TabId = "home" | "learn" | "tools" | "library";

type AppTab = {
  id: TabId;
  label: string;
  to: string;
  icon: LucideIcon;
};

const TABS: AppTab[] = [
  { id: "home", label: "Ana Sayfa", to: "/", icon: House },
  { id: "learn", label: "Öğren", to: "/lessons", icon: BookOpenText },
  { id: "tools", label: "Araçlar", to: "/calculations", icon: Calculator },
  { id: "library", label: "Kitaplık", to: "/library", icon: LibraryBig },
];

const LEARN_ROUTES = [/^\/lessons(?:\/|$)/, /^\/exercises(?:\/|$)/, /^\/machine\/[^/]+\/topics(?:\/|$)/];
const TOOL_ROUTES = [
  /^\/calculations(?:\/|$)/,
  /^\/(?:stability|cargo|meteorology|navigation|economics|safety|seamanship|environment)(?:\/|$)/,
  /^\/(?:ballast|tank|engine|structural|special-ships|emissions|converter|hydrodynamics|machine-calculations)$/,
  /^\/machine\/(?:calculations|formulas|rules|assistant|quiz)$/,
  /^\/solas(?:\/|$)/,
];
const LIBRARY_ROUTES = [
  /^\/library$/,
  /^\/(?:crew|bridge|machinery|ship-systems|ship-tasks|ship-operations|glossary|regulations|passage-plan)(?:\/|$)/,
  /^\/communication(?:\/|$)/,
];

const activeTabForPath = (pathname: string): TabId => {
  if (LEARN_ROUTES.some((pattern) => pattern.test(pathname))) return "learn";
  if (TOOL_ROUTES.some((pattern) => pattern.test(pathname))) return "tools";
  if (LIBRARY_ROUTES.some((pattern) => pattern.test(pathname))) return "library";
  return "home";
};

export function AppTabBar() {
  const { pathname } = useLocation();
  const hidden = isAppChromeHidden(pathname);
  const activeTab = activeTabForPath(pathname);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("app-tabbar-visible", !hidden);
    return () => document.body.classList.remove("app-tabbar-visible");
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav
      aria-label="Ana bölümler"
      className="app-tabbar surface-glass"
      data-app-tabbar
    >
      <div className="app-tabbar__items">
        {TABS.map(({ id, label, to, icon: Icon }) => {
          const active = activeTab === id;
          return (
            <NavLink
              key={id}
              to={to}
              end={to === "/"}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              onClick={() => hapticSelection()}
              className={cn("app-tabbar__item", active && "app-tabbar__item--active")}
            >
              <span className="app-tabbar__icon" aria-hidden>
                <Icon />
              </span>
              <span className="app-tabbar__label">{label}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          aria-label="Uygulamada ara"
          className="app-tabbar__item app-tabbar__search"
          onClick={() => {
            hapticSelection();
            window.dispatchEvent(new Event("open-global-search"));
          }}
        >
          <span className="app-tabbar__icon" aria-hidden>
            <Search />
          </span>
          <span className="app-tabbar__label">Ara</span>
        </button>
      </div>
    </nav>
  );
}

export default AppTabBar;
