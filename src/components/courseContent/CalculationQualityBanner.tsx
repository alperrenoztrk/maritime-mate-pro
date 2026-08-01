import { CheckCircle2, FileCheck2, Sigma } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CalculationQualityBanner() {
  return (
    <Card className="border-primary/20 bg-primary/[0.035]">
      <CardContent className="grid gap-3 p-4 sm:grid-cols-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          <div>
            <p className="text-xs font-semibold">Girdi doğrulama</p>
            <p className="text-[11px] text-muted-foreground">Boş, geçersiz ve sınır dışı değerler hesap öncesi engellenir.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Sigma className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          <div>
            <p className="text-xs font-semibold">Tam işlem izi</p>
            <p className="text-[11px] text-muted-foreground">Formül, birimler, yerine koyma ve sonuç aynı dökümde gösterilir.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <p className="text-xs font-semibold">Kaynak ve UTC kaydı</p>
            <p className="text-[11px] text-muted-foreground">Kaynak, kapsam notu ve hesap zamanı kopyalanabilir kayda eklenir.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
