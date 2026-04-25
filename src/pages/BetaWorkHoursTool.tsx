import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileImage,
  Sparkles,
  Download,
  AlertTriangle,
  Loader2,
  Trash2,
  Check,
} from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import {
  emptyDay,
  type PersonRecord,
  type DayHours,
  evaluateDay,
  countWork,
  countRest,
} from "@/utils/workHoursStcw";
import { buildWorkHoursWorkbook, downloadBlob } from "@/utils/workHoursExcel";

interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
}

interface ExtractResponse {
  crew: { name: string; rank: string }[];
  previousMonth: {
    name: string;
    totalWorkHours: number;
    totalRestHours: number;
    notes?: string;
  }[];
  logbook: {
    date: string;
    name: string;
    intervals: { start: string; end: string; activity?: string }[];
    lowConfidence?: boolean;
  }[];
}

const MAX_DIM = 2048;

async function fileToDataUrl(file: File): Promise<string> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  let { width, height } = img;
  if (width > MAX_DIM || height > MAX_DIM) {
    const r = MAX_DIM / Math.max(width, height);
    width = Math.round(width * r);
    height = Math.round(height * r);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function timeToHourIndex(t: string): number {
  const [h] = t.split(":").map(Number);
  return Math.max(0, Math.min(23, h));
}

function applyInterval(day: DayHours, start: string, end: string): DayHours {
  const s = timeToHourIndex(start);
  let e = timeToHourIndex(end);
  if (e <= s) e = 24; // overnight wraps treated as up to 24 here; user can edit
  const out = [...day];
  for (let i = s; i < e; i += 1) out[i] = true;
  return out;
}

function buildPeople(data: ExtractResponse): PersonRecord[] {
  const map = new Map<string, PersonRecord>();
  for (const c of data.crew) {
    const id = c.name.toLowerCase().trim();
    if (!map.has(id))
      map.set(id, { id, name: c.name, rank: c.rank, days: {} });
  }
  for (const e of data.logbook) {
    const id = e.name.toLowerCase().trim();
    let person = map.get(id);
    if (!person) {
      person = { id, name: e.name, rank: "—", days: {} };
      map.set(id, person);
    }
    const day = person.days[e.date] ?? emptyDay();
    let next = day;
    for (const i of e.intervals) {
      next = applyInterval(next, i.start, i.end);
    }
    person.days[e.date] = next;
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

function Dropzone({
  label,
  hint,
  images,
  setImages,
  multiple,
}: {
  label: string;
  hint: string;
  images: UploadedImage[];
  setImages: (next: UploadedImage[]) => void;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const list: UploadedImage[] = [];
    for (const f of Array.from(files)) {
      try {
        const dataUrl = await fileToDataUrl(f);
        list.push({
          id: crypto.randomUUID(),
          name: f.name,
          dataUrl,
        });
      } catch {
        toast.error(`${f.name} yüklenemedi`);
      }
    }
    setImages(multiple ? [...images, ...list] : list);
  };

  return (
    <div className="space-y-2">
      <div>
        <Label className="text-sm font-semibold">{label}</Label>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
      <div
        className="flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 bg-card/60 p-4 text-center transition hover:border-amber-500/60 hover:bg-amber-500/5"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <Upload className="mb-1 h-5 w-5 text-amber-600" />
        <p className="text-xs font-medium text-foreground">
          {images.length === 0
            ? "Tıkla veya sürükle"
            : `${images.length} dosya seçildi`}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative h-16 w-16 overflow-hidden rounded-lg border border-border"
            >
              <img
                src={img.dataUrl}
                alt={img.name}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImages(images.filter((i) => i.id !== img.id));
                }}
                className="absolute right-0.5 top-0.5 rounded-full bg-black/70 p-0.5 text-white"
                aria-label="Kaldır"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BetaWorkHoursTool() {
  const [crewImgs, setCrewImgs] = useState<UploadedImage[]>([]);
  const [prevImgs, setPrevImgs] = useState<UploadedImage[]>([]);
  const [logImgs, setLogImgs] = useState<UploadedImage[]>([]);
  const [monthLabel, setMonthLabel] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });
  const [vesselName, setVesselName] = useState("");
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<PersonRecord[]>([]);
  const [activePerson, setActivePerson] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!crewImgs.length || !prevImgs.length || !logImgs.length) {
      toast.error("Lütfen üç görsel grubunu da yükleyin");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "extract-work-hours",
        {
          body: {
            crewListImages: crewImgs.map((i) => ({ dataUrl: i.dataUrl })),
            previousMonthImages: prevImgs.map((i) => ({ dataUrl: i.dataUrl })),
            logbookImages: logImgs.map((i) => ({ dataUrl: i.dataUrl })),
            monthLabel,
            vesselName: vesselName || undefined,
          },
        },
      );
      if (error) throw error;
      const res = data as ExtractResponse;
      const built = buildPeople(res);
      if (!built.length) {
        toast.error("AI hiçbir kayıt çıkaramadı, fotoğrafları kontrol edin");
        return;
      }
      setPeople(built);
      setActivePerson(built[0].id);
      toast.success(`${built.length} personel için tablo oluşturuldu`);
    } catch (e: any) {
      const msg = e?.message ?? "";
      if (msg.includes("429"))
        toast.error("Çok fazla istek. Bir dakika bekleyin.");
      else if (msg.includes("402"))
        toast.error("AI kredisi bitti. Workspace ayarlarından kredi ekleyin.");
      else toast.error("AI okuma başarısız. Tekrar deneyin.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleHour = (personId: string, date: string, hour: number) => {
    setPeople((prev) =>
      prev.map((p) => {
        if (p.id !== personId) return p;
        const day = [...(p.days[date] ?? emptyDay())];
        day[hour] = !day[hour];
        return { ...p, days: { ...p.days, [date]: day } };
      }),
    );
  };

  const handleDownload = async () => {
    try {
      const blob = await buildWorkHoursWorkbook(people, {
        monthLabel,
        vesselName: vesselName || undefined,
      });
      downloadBlob(
        blob,
        `calisma-saati-${monthLabel}${vesselName ? `-${vesselName}` : ""}.xlsx`,
      );
      toast.success("Excel indirildi");
    } catch (e) {
      console.error(e);
      toast.error("Excel oluşturulamadı");
    }
  };

  const active = people.find((p) => p.id === activePerson);
  const dates = active ? Object.keys(active.days).sort() : [];

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 pb-32 pt-6 dark:from-[hsl(20,40%,6%)] dark:via-[hsl(20,40%,8%)] dark:to-[hsl(20,40%,10%)]"
      data-no-translate
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <header className="space-y-2">
          <Link
            to="/beta"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm hover:border-primary/40"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Beta
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            Otomatik Çalışma Saati Tablosu
          </h1>
          <p className="text-xs text-muted-foreground">
            STCW A-VIII/1 ve MLC 2006 Standard A2.3 referansları kullanılır.
            Çıktı tahminidir; lütfen tabloyu manuel kontrol edip düzenleyin.
          </p>
        </header>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-100">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <div>
              AI çıktıları her zaman %100 doğru olmaz. İndirmeden önce her
              hücreyi inceleyin. Jurnal okunaklı, düz açıyla ve iyi ışıkta
              fotoğraflanmalı.
            </div>
          </div>
        </div>

        <section className="grid gap-4 rounded-2xl border border-border/60 bg-card/90 p-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:space-y-0">
            <div>
              <Label htmlFor="month" className="text-sm font-semibold">
                Ay
              </Label>
              <Input
                id="month"
                type="month"
                value={monthLabel}
                onChange={(e) => setMonthLabel(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="vessel" className="text-sm font-semibold">
                Gemi adı (opsiyonel)
              </Label>
              <Input
                id="vessel"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="Örn. M/V SAMPLE"
              />
            </div>
          </div>

          <Dropzone
            label="1. Personel Listesi"
            hint="Gemideki tüm denizcilerin isim/ünvan listesi"
            images={crewImgs}
            setImages={setCrewImgs}
          />
          <Dropzone
            label="2. Önceki Ay Tablosu"
            hint="Devir bakiyesi ve format referansı"
            images={prevImgs}
            setImages={setPrevImgs}
          />
          <div className="sm:col-span-2">
            <Dropzone
              label="3. Jurnal Sayfaları (cari ay)"
              hint="Vardiya kayıtlarının olduğu sayfalar — birden fazla görsel yükleyebilirsiniz"
              images={logImgs}
              setImages={setLogImgs}
              multiple
            />
          </div>

          <div className="sm:col-span-2">
            <Button
              onClick={handleExtract}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Görüntüler okunuyor…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI ile çıkar
                </>
              )}
            </Button>
          </div>
        </section>

        {people.length > 0 && (
          <section className="space-y-4 rounded-2xl border border-border/60 bg-card/90 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-foreground">
                Düzenlenebilir Tablo
              </h2>
              <Button
                onClick={handleDownload}
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Excel indir
              </Button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {people.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePerson(p.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    activePerson === p.id
                      ? "bg-amber-500 text-white shadow"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {active && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[10px]">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 border bg-muted px-1.5 py-1 text-left">
                        {active.name} ({active.rank})
                      </th>
                      {Array.from({ length: 24 }, (_, h) => (
                        <th
                          key={h}
                          className="border bg-muted px-1 py-1 text-center"
                        >
                          {h.toString().padStart(2, "0")}
                        </th>
                      ))}
                      <th className="border bg-muted px-1 py-1 text-center">
                        W
                      </th>
                      <th className="border bg-muted px-1 py-1 text-center">
                        R
                      </th>
                      <th className="border bg-muted px-1 py-1 text-center">
                        İhlal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dates.map((d) => {
                      const day = active.days[d] ?? emptyDay();
                      const ev = evaluateDay(d, day);
                      const violation = !ev.rest24Ok || !ev.splitOk;
                      return (
                        <tr key={d}>
                          <td className="sticky left-0 z-10 border bg-card px-1.5 py-0.5 font-mono">
                            {d.slice(5)}
                          </td>
                          {day.map((isWork, h) => (
                            <td
                              key={h}
                              className="border p-0"
                              onClick={() => toggleHour(active.id, d, h)}
                            >
                              <button
                                type="button"
                                className={`block h-5 w-full ${
                                  isWork
                                    ? "bg-blue-700 text-white"
                                    : "bg-slate-100 dark:bg-slate-800"
                                } hover:opacity-80`}
                                aria-label={`${d} ${h}:00 ${isWork ? "çalışma" : "dinlenme"}`}
                              >
                                {isWork ? "W" : ""}
                              </button>
                            </td>
                          ))}
                          <td className="border px-1 py-0.5 text-center font-semibold">
                            {countWork(day)}
                          </td>
                          <td className="border px-1 py-0.5 text-center font-semibold">
                            {countRest(day)}
                          </td>
                          <td
                            className={`border px-1 py-0.5 text-center font-semibold ${
                              violation
                                ? "bg-red-600 text-white"
                                : "text-emerald-700"
                            }`}
                          >
                            {violation ? "!" : <Check className="inline h-3 w-3" />}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-blue-700" /> Çalışma (W)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-slate-200 dark:bg-slate-700" />{" "}
                Dinlenme
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-red-600" /> İhlal (24s &lt;
                10s veya bölme kuralı)
              </span>
            </div>
          </section>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
