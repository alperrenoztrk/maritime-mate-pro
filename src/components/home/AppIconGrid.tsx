import { Link } from "react-router-dom";
import { FlaskConical, Settings, type LucideIcon } from "lucide-react";

interface AppIcon {
  label: string;
  to: string;
  Icon: LucideIcon;
  gradient: string;
}

// Diğer tüm bölümler ana sayfadaki kitabın (İçindekiler) içinde yer alır.
const APPS: AppIcon[] = [
  { label: "", to: "/beta", Icon: FlaskConical, gradient: "linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)" },
  { label: "", to: "/settings", Icon: Settings, gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)" },
];


export function AppIconGrid() {
  return (
    <div className="mx-auto grid w-full max-w-[220px] grid-cols-2 gap-x-6 gap-y-6 px-4">
      {APPS.map(({ label, to, Icon, gradient }) => (
        <Link
          key={to}
          to={to}
          className="group flex flex-col items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-[22px]"
          aria-label={label}
        >
          <div
            className="relative flex aspect-square w-full items-center justify-center rounded-[22px] transition-transform duration-150 group-active:scale-90"
            style={{
              background: gradient,
              boxShadow:
                "0 8px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)",
            }}
          >
            <Icon className="h-1/2 w-1/2 text-white drop-shadow-md" strokeWidth={1.8} />
            <div
              className="pointer-events-none absolute inset-0 rounded-[22px]"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%)",
              }}
            />
          </div>
          <span className="text-[11px] font-medium text-white/90 drop-shadow-md leading-tight text-center">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
