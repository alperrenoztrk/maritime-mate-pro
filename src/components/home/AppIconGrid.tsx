import { Link } from "react-router-dom";
import { BookOpen, Users, Ship, ClipboardList, FlaskConical, BookA, Settings, Sparkles, StickyNote, type LucideIcon } from "lucide-react";
import { hapticSelection } from "@/services/haptics";

interface AppIcon {
  label: string;
  to: string;
  Icon: LucideIcon;
  gradient: string;
}

const APPS: AppIcon[] = [
  { label: "Dersler", to: "/lessons", Icon: BookOpen, gradient: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)" },
  { label: "Alıştırmalar", to: "/exercises", Icon: Sparkles, gradient: "linear-gradient(135deg, #a855f7 0%, #4f46e5 100%)" },
  { label: "Personel", to: "/crew", Icon: Users, gradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)" },
  { label: "Gemi Sistemleri", to: "/ship-systems", Icon: Ship, gradient: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)" },
  { label: "Operasyonlar", to: "/ship-operations", Icon: ClipboardList, gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)" },
  { label: "Sözlük", to: "/glossary", Icon: BookA, gradient: "linear-gradient(135deg, #0891b2 0%, #1e3a8a 100%)" },
  { label: "Beta", to: "/beta", Icon: FlaskConical, gradient: "linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)" },
  { label: "Notlar", to: "/notes", Icon: StickyNote, gradient: "linear-gradient(135deg, #facc15 0%, #ca8a04 100%)" },
  { label: "Ayarlar", to: "/settings", Icon: Settings, gradient: "linear-gradient(135deg, #64748b 0%, #334155 100%)" },
];


export function AppIconGrid() {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-6 px-4 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-7">
      {APPS.map(({ label, to, Icon, gradient }) => (
        <Link
          key={to}
          to={to}
          onClick={hapticSelection}
          className="group flex flex-col items-center gap-2 rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          aria-label={label}
        >
          <div
            className="ios-pressable relative flex aspect-square w-full items-center justify-center rounded-[22px] group-active:scale-[0.92]"
            style={{
              background: gradient,
              boxShadow:
                "0 14px 28px -16px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.16)",
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
          <span className="text-center text-xs font-medium leading-tight text-foreground/90">
            {label}
          </span>
        </Link>
      ))}
    </div>
  );
}
