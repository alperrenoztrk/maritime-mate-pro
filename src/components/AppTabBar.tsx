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
import { useLanguage } from "@/contexts/useLanguage";
import { getCoreUiTranslation } from "@/i18n/coreUiTranslations";
import { APP_TAB_ROOTS, appTabForPath, type AppTabId } from "@/lib/appNavigation";

type AppTab = {
  id: AppTabId;
  label: string;
  to: string;
  icon: LucideIcon;
};

const TABS: AppTab[] = [
  { id: "home", label: "Ana Sayfa", to: "/", icon: House },
  { id: "learn", label: "Öğren", to: "/lessons", icon: BookOpenText },
  { id: "tools", label: "Araçlar", to: "/calculations", icon: Calculator },
  { id: "library", label: "Kütüphane", to: "/library", icon: LibraryBig },
  { id: "search", label: "Ara", to: "/search", icon: Search },
];

// Each top-level area owns its most recent route for the current app session,
// matching iOS tab-controller behaviour. Switching away and back no longer
// throws the user out of a lesson/calculation hierarchy.
const lastRouteByTab: Record<AppTabId, string> = { ...APP_TAB_ROOTS };

export function AppTabBar() {
  const { pathname } = useLocation();
  const { currentLanguage } = useLanguage();
  const hidden = isAppChromeHidden(pathname);
  const activeTab = appTabForPath(pathname);
  const localize = (source: string) => getCoreUiTranslation(source, currentLanguage) ?? source;

  useEffect(() => {
    lastRouteByTab[activeTab] = pathname;
  }, [activeTab, pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("app-tabbar-visible", !hidden);
    return () => document.body.classList.remove("app-tabbar-visible");
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav
      aria-label={localize("Ana bölümler")}
      className="app-tabbar surface-glass notranslate"
      data-app-tabbar
      translate="no"
      lang={currentLanguage}
    >
      <div className="app-tabbar__items">
        {TABS.map(({ id, label, to, icon: Icon }) => {
          const active = activeTab === id;
          const destination = active ? to : lastRouteByTab[id] || to;
          const localizedLabel = localize(label);
          return (
            <NavLink
              key={id}
              to={destination}
              end={destination === "/"}
              aria-current={active ? "page" : undefined}
              aria-label={localizedLabel}
              onClick={(event) => {
                hapticSelection();
                if (active && pathname === to) {
                  event.preventDefault();
                  if (id === "search") {
                    window.dispatchEvent(new Event("focus-app-search"));
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }
              }}
              className={cn("app-tabbar__item", active && "app-tabbar__item--active")}
            >
              <span className="app-tabbar__icon" aria-hidden>
                <Icon />
              </span>
              <span className="app-tabbar__label">{localizedLabel}</span>
            </NavLink>
          );
        })}

      </div>
    </nav>
  );
}

export default AppTabBar;
