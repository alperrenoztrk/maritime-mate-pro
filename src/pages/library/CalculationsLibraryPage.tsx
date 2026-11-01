import { BarChart3, ChevronRight, Zap, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AppSymbol } from "@/components/ui/AppSymbol";
import { InsetGroupedList } from "@/components/ui/InsetGroupedList";
import { hapticImpact } from "@/lib/haptics";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { accentTone } from "@/components/library/libraryAccent";

interface CalcTool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  accent: string;
}

// Tools currently lists only the unit converter. The other calculators keep
// their routes and stay reachable from their lessons and topic pages.
const TOOLS: CalcTool[] = [
  { id: "unit-conv", title: "Unit Converter", description: "Distance, speed, mass, volume and more", icon: Zap, to: "/converter", accent: "accent-ocean" },
];

function ToolCard({ tool }: { tool: CalcTool }) {
  return (
    <div className="ios-list-row surface-2 group flex min-h-[5.5rem] items-stretch overflow-hidden rounded-xl border border-border/60 transition-[background-color,border-color,transform] duration-control hover:border-primary/25 active:scale-[0.99]">
      <Link
        to={tool.to}
        onClick={() => hapticImpact("light")}
        className="flex min-w-0 flex-1 items-center gap-3 px-3.5 py-3 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span className="library-symbol-tile flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={accentTone(tool.accent)}>
          <tool.icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug text-foreground">{tool.title}</span>
          <span className="mt-1 block text-xs leading-snug text-muted-foreground">{tool.description}</span>
        </span>
        <AppSymbol name="chevron.right" fallback={ChevronRight} className="h-4 w-4 shrink-0 text-muted-foreground" />
      </Link>
    </div>
  );
}

export default function CalculationsLibraryPage() {
  return (
    <LibraryPageShell title="Tools" icon={BarChart3}>
      <InsetGroupedList columns={2}>
        {TOOLS.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
      </InsetGroupedList>
    </LibraryPageShell>
  );
}
