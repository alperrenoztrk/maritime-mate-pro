import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ChevronUp, ChevronDown } from "lucide-react";
import { useHomeWidgets, AVAILABLE_WIDGETS } from "@/hooks/useHomeWidgets";

export function WidgetSettings() {
  const { entries, toggle, move } = useHomeWidgets();

  return (
    <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5" />
          <span data-translatable>Home Page Widgets</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {entries.map((entry, idx) => {
            const meta = AVAILABLE_WIDGETS.find((w) => w.id === entry.id);
            if (!meta) return null;
            return (
              <li key={entry.id} className="flex items-center gap-3 py-3">
                <div className="flex flex-col">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => move(entry.id, -1)}
                    disabled={idx === 0}
                    aria-label="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => move(entry.id, 1)}
                    disabled={idx === entries.length - 1}
                    aria-label="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    <span data-translatable>{meta.label}</span>
                  </div>
                </div>
                <Switch
                  checked={entry.enabled}
                  onCheckedChange={() => toggle(entry.id)}
                  aria-label={`${meta.label} widget on/off`}
                />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
