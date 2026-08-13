import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardCheck,
  Download,
  RotateCcw,
  Check,
  AlertTriangle,
  MinusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  PSC_CHECKLIST,
  loadState,
  saveState,
  clearState,
  summarize,
  buildPscReport,
  type ChecklistState,
  type ItemStatus,
} from "@/utils/pscChecklist";
import { downloadBlob } from "@/utils/downloadBlob";

const STATUS_OPTIONS: {
  value: ItemStatus;
  label: string;
  icon: typeof Check;
  active: string;
}[] = [
  { value: "ok", label: "Compliant", icon: Check, active: "bg-emerald-600 text-white" },
  {
    value: "deficiency",
    label: "Eksik",
    icon: AlertTriangle,
    active: "bg-red-600 text-white",
  },
  {
    value: "na",
    label: "N/A",
    icon: MinusCircle,
    active: "bg-slate-500 text-white",
  },
];

export default function BetaPscChecklist() {
  // Kayıtlı işaretlemeler ilk render'da okunur. Bir efektle yüklenseydi
  // aşağıdaki kaydetme efekti aynı turda boş nesneyi diske yazar ve kayıtlar
  // bir an için silinirdi.
  const [state, setState] = useState<ChecklistState>(loadState);
  const [vesselName, setVesselName] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const summary = useMemo(() => summarize(state), [state]);

  const setStatus = (id: string, status: ItemStatus) => {
    setState((prev) => {
      const current = prev[id];
      // Toggle off if the same status is tapped again.
      const next: ItemStatus = current?.status === status ? "pending" : status;
      return { ...prev, [id]: { status: next, note: current?.note ?? "" } };
    });
  };

  const setNote = (id: string, note: string) => {
    setState((prev) => ({
      ...prev,
      [id]: { status: prev[id]?.status ?? "pending", note },
    }));
  };

  const handleReset = () => {
    if (!window.confirm("Tüm işaretlemeler silinsin mi?")) return;
    clearState();
    setState({});
    toast.success("Kontrol listesi sıfırlandı.");
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const blob = await buildPscReport(state, vesselName, inspectionDate);
      const safe = (vesselName || "gemi").replace(/[^\p{L}\p{N}_-]+/gu, "_");
      downloadBlob(blob, `PSC_hazirlik_${safe}.xlsx`);
      toast.success("Rapor indirildi.");
    } catch (e) {
      console.error(e);
      toast.error("Rapor oluşturulamadı.");
    } finally {
      setExporting(false);
    }
  };

  const progressPct = Math.round(summary.progress * 100);

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 pb-24 pt-[max(4rem,calc(env(safe-area-inset-top)+3.25rem))]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 text-white shadow-md">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                PSC Denetim Hazırlık Listesi
              </h1>
            </div>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/90 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="psc-vessel">Gemi adı</Label>
              <Input
                id="psc-vessel"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="M/V Örnek"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="psc-date">Denetim tarihi</Label>
              <Input
                id="psc-date"
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span>İlerleme: {progressPct}%</span>
              <span>
                {summary.total - summary.pending}/{summary.total} madde
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 transition-[background-color,color,border-color,box-shadow,opacity,transform,width]"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-3 pt-1 text-micro font-medium">
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <Check className="h-3.5 w-3.5" /> Uygun: {summary.ok}
              </span>
              <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-3.5 w-3.5" /> Eksik: {summary.deficiency}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <MinusCircle className="h-3.5 w-3.5" /> N/A: {summary.na}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                Bekleyen: {summary.pending}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleExport}
              disabled={exporting}
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Download className="mr-2 h-4 w-4" />
              {exporting ? "Hazırlanıyor…" : "Excel rapor indir"}
            </Button>
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Sıfırla
            </Button>
          </div>
        </section>

        {summary.deficiency > 0 && (
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-700 dark:text-red-300">
            <strong className="font-semibold">{summary.deficiency} eksiklik</strong>{" "}
            işaretlendi. Denetimden önce düzeltici faaliyet planlayın.
          </div>
        )}

        {PSC_CHECKLIST.map((cat) => {
          const catTotal = cat.items.length;
          const catDone = cat.items.filter(
            (i) => (state[i.id]?.status ?? "pending") !== "pending",
          ).length;
          return (
            <section
              key={cat.id}
              className="space-y-3 rounded-2xl border border-border/60 bg-card/90 p-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">
                  {cat.title}
                </h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-micro font-semibold text-muted-foreground">
                  {catDone}/{catTotal}
                </span>
              </div>

              <ul className="space-y-3">
                {cat.items.map((item) => {
                  const itemState = state[item.id];
                  const status = itemState?.status ?? "pending";
                  return (
                    <li
                      key={item.id}
                      className="rounded-xl border border-border/50 bg-background/40 p-3"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-micro uppercase tracking-wide text-muted-foreground">
                            {item.ref}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-1.5">
                          {STATUS_OPTIONS.map((opt) => {
                            const Icon = opt.icon;
                            const isActive = status === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => setStatus(item.id, opt.value)}
                                aria-pressed={isActive}
                                aria-label={`${item.title}: ${opt.label}`}
                                className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                                  isActive
                                    ? opt.active
                                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                                }`}
                              >
                                <Icon className="h-3.5 w-3.5" />
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {status === "deficiency" && (
                        <Input
                          value={itemState?.note ?? ""}
                          onChange={(e) => setNote(item.id, e.target.value)}
                          placeholder="Eksiklik notu / düzeltici faaliyet…"
                          className="mt-2 h-8 text-xs"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-800 dark:text-amber-200">
          <strong className="font-semibold">Uyarı:</strong> Bu liste yalnızca
          hazırlık amaçlıdır ve resmi bir denetim formu değildir. İşaretlemeler
          yalnızca bu cihazda saklanır. Geminizin tipine ve sefer bölgesine özel
          ek gereklilikleri daima ilgili sözleşme metinlerinden doğrulayın.
        </div>
      </div>

    </div>
  );
}
