import { BookOpen, Calculator, Home, Search, UserRound } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { hapticSelection } from "@/services/haptics";

type TabDefinition = {
  label: string;
  to?: string;
  icon: typeof Home;
  isActive: (pathname: string) => boolean;
  action?: () => void;
};

const startsWithAny = (pathname: string, prefixes: string[]) =>
  prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

const LIBRARY_PATHS = [
  "/lessons",
  "/exercises",
  "/crew",
  "/ship-systems",
  "/ship-operations",
  "/ship-tasks",
  "/bridge",
  "/glossary",
  "/regulations",
  "/exam-preparation",
  "/notes",
];

const CALCULATION_PATHS = [
  "/calculations",
  "/navigation",
  "/stability",
  "/cargo",
  "/meteorology",
  "/seamanship",
  "/safety",
  "/environment",
  "/emissions",
  "/machine",
  "/machine-calculations",
  "/ballast",
  "/tank",
  "/engine",
  "/structural",
  "/special-ships",
  "/hydrodynamics",
  "/economics",
  "/converter",
  "/formulas",
  "/passage-plan",
  "/weather-forecast",
  "/sunrise-times",
  "/sunset-times",
  "/moon-phases",
  "/location-selector",
  "/clock",
];

const HIDDEN_PATHS = [
  "/auth",
  "/reset-password",
  "/.lovable/oauth/consent",
  "/beta/ship-simulator",
];

export function AppTabBar() {
  const { pathname } = useLocation();
  const hidden = startsWithAny(pathname, HIDDEN_PATHS);

  useEffect(() => {
    document.body.classList.toggle("has-app-tab-bar", !hidden);
    return () => document.body.classList.remove("has-app-tab-bar");
  }, [hidden]);

  if (hidden) return null;

  const openSearch = () => {
    hapticSelection();
    window.dispatchEvent(new Event("open-global-search"));
  };

  const tabs: TabDefinition[] = [
    { label: "Ana Sayfa", to: "/", icon: Home, isActive: (path) => startsWithAny(path, ["/", "/maritime-news"]) },
    { label: "Kitaplık", to: "/lessons", icon: BookOpen, isActive: (path) => startsWithAny(path, LIBRARY_PATHS) },
    { label: "Hesapla", to: "/calculations", icon: Calculator, isActive: (path) => startsWithAny(path, CALCULATION_PATHS) },
    { label: "Ara", icon: Search, isActive: () => false, action: openSearch },
    {
      label: "Profil",
      to: "/settings",
      icon: UserRound,
      isActive: (path) => startsWithAny(path, ["/settings", "/pro"]),
    },
  ];

  return (
    <nav
      aria-label="Ana navigasyon"
      className="pointer-events-none fixed inset-x-0 z-40 flex justify-center pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))]"
      style={{ bottom: "calc(var(--ad-banner-height, 0px) + max(0.5rem, env(safe-area-inset-bottom)))" }}
    >
      <div className="ios-glass-strong pointer-events-auto grid h-[4.25rem] w-full max-w-[430px] grid-cols-5 rounded-[1.7rem] p-1.5">
        {tabs.map((tab) => {
          const active = tab.isActive(pathname);
          const Icon = tab.icon;
          const className = [
            "ios-pressable relative flex min-h-11 min-w-0 flex-col items-center justify-center gap-0.5 rounded-[1.25rem] px-1",
            active ? "bg-primary/15 text-primary shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)]" : "text-muted-foreground",
          ].join(" ");
          const content = (
            <>
              <Icon className="h-[1.2rem] w-[1.2rem]" strokeWidth={active ? 2.35 : 2} />
              <span className="max-w-full truncate text-[0.6875rem] font-semibold leading-none" data-translatable>
                {tab.label}
              </span>
            </>
          );

          return tab.to ? (
            <Link
              key={tab.label}
              to={tab.to}
              aria-current={active ? "page" : undefined}
              className={className}
              onClick={hapticSelection}
            >
              {content}
            </Link>
          ) : (
            <button key={tab.label} type="button" className={className} onClick={tab.action} aria-label={tab.label} aria-haspopup="dialog">
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
