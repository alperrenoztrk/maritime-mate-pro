import { Link } from "react-router-dom";
import {
  BookA,
  BookOpen,
  ChevronRight,
  ClipboardList,
  FlaskConical,
  Settings,
  Ship,
  Sparkles,
  StickyNote,
  Users,
  type LucideIcon,
} from "lucide-react";
import { hapticImpact } from "@/lib/haptics";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";

interface AppShortcut {
  label: string;
  description: string;
  to: string;
  icon: LucideIcon;
}

const APPS: AppShortcut[] = [
  { label: "Dersler", description: "Güverte ve makine", to: "/lessons", icon: BookOpen },
  { label: "Alıştırmalar", description: "Bilgini pekiştir", to: "/exercises", icon: Sparkles },
  { label: "Personel", description: "Roller ve görevler", to: "/crew", icon: Users },
  { label: "Gemi Sistemleri", description: "Sistem başvuruları", to: "/ship-systems", icon: Ship },
  { label: "Operasyonlar", description: "Gemi operasyonları", to: "/ship-operations", icon: ClipboardList },
  { label: "Sözlük", description: "Denizcilik terimleri", to: "/glossary", icon: BookA },
  { label: "Beta", description: "Yeni özellikler", to: "/beta", icon: FlaskConical },
  { label: "Notlar", description: "Kişisel notların", to: "/notes", icon: StickyNote },
  { label: "Ayarlar", description: "Uygulama tercihleri", to: "/settings", icon: Settings },
];

export function AppIconGrid() {
  return (
    <section aria-labelledby="quick-access-title" className="space-y-3">
      <div className="flex items-end justify-between gap-3 px-1">
        <div>
          <h2 id="quick-access-title" className="text-xl font-semibold tracking-[-0.02em] text-foreground">
            Hızlı Erişim
          </h2>
          <p className="mt-0.5 text-caption text-muted-foreground">Sık kullanılan bölümler</p>
        </div>
      </div>

      <InsetGroupedList columns={2}>
        {APPS.map(({ label, description, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            aria-label={label}
            onClick={() => hapticImpact("light")}
            className="ios-list-row group flex min-h-[4.5rem] items-center gap-3 px-3.5 py-3 outline-none transition-[background-color,transform] duration-control focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">{label}</span>
              <span className="mt-0.5 block truncate text-caption text-muted-foreground">{description}</span>
            </span>
            <AppSymbol
              name="chevron.right"
              fallback={ChevronRight}
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-control group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </InsetGroupedList>
    </section>
  );
}
