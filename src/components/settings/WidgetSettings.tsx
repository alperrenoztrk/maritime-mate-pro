import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
          <span>Ana Sayfa Widget'ları</span>
        </CardTitle>
        <CardDescription>
          Ana sayfada uygulama ikonlarının yanında görünecek widget'ları seç ve sıralarını değiştir
        </CardDescription>
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
                    aria-label="Yukarı taşı"
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
                    aria-label="Aşağı taşı"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{meta.label}</div>
                  <div className="text-xs text-muted-foreground">{meta.description}</div>
                </div>
                <Switch
                  checked={entry.enabled}
                  onCheckedChange={() => toggle(entry.id)}
                  aria-label={`${meta.label} widget'ını aç/kapat`}
                />
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Widget'lar ana sayfada uygulama ikonlarının altında, seçtiğin sırayla görünür.
        </p>
      </CardContent>
    </Card>
  );
}
