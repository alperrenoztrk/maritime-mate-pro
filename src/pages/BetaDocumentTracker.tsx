import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  BellRing,
  CalendarClock,
  Camera,
  CheckCircle2,
  Eye,
  FileCheck2,
  FileImage,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuthContext";
import {
  getDocumentExpiryState,
  sortByExpiry,
  type DocumentExpiryStatus,
} from "@/lib/documentExpiry";
import {
  createDocumentFromPhoto,
  deleteDocument,
  DocumentTrackerError,
  fetchDocuments,
  getDocumentImageUrl,
  MAX_DOCUMENT_FILES,
  type DocumentProcessingStage,
  type MaritimeDocumentRecord,
} from "@/services/documentTracker";
import { toast } from "sonner";
import { EmptyState } from "@/components/state/AppState";

type FilterKey = "all" | "attention" | "valid" | "unknown";
type JobState = "queued" | DocumentProcessingStage | "done" | "error";

interface UploadJob {
  id: string;
  fileName: string;
  state: JobState;
  message?: string;
}

const STAGE_LABELS: Record<JobState, string> = {
  queued: "Sırada",
  preparing: "Fotoğraf hazırlanıyor",
  checking: "Tekrar kontrolü yapılıyor",
  analyzing: "Yapay zekâ belgeyi okuyor",
  uploading: "Güvenli arşive yükleniyor",
  saving: "Tarihler kaydediliyor",
  done: "Eklendi",
  error: "Eklenemedi",
};

const STATUS_STYLE: Record<
  DocumentExpiryStatus,
  { label: string; badge: string; border: string }
> = {
  expired: {
    label: "Süresi doldu",
    badge: "border-red-500/40 bg-red-500/15 text-red-700 dark:text-red-300",
    border: "border-red-500/45",
  },
  critical: {
    label: "Acil",
    badge: "border-orange-500/40 bg-orange-500/15 text-orange-700 dark:text-orange-300",
    border: "border-orange-500/45",
  },
  warning: {
    label: "Yaklaşıyor",
    badge: "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300",
    border: "border-amber-500/40",
  },
  upcoming: {
    label: "Planla",
    badge: "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-500/30",
  },
  valid: {
    label: "Geçerli",
    badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-500/25",
  },
  unknown: {
    label: "Kontrol gerekli",
    badge: "border-slate-500/40 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    border: "border-slate-500/35",
  },
};

function formatDate(value: string | null): string {
  if (!value) return "Okunamadı";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return "Okunamadı";
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function filterDocument(document: MaritimeDocumentRecord, filter: FilterKey): boolean {
  if (filter === "all") return true;
  const { status } = getDocumentExpiryState(document.expiry_date, document.no_expiry);
  if (filter === "attention") {
    return ["expired", "critical", "warning", "upcoming"].includes(status);
  }
  if (filter === "unknown") return status === "unknown" || document.review_required;
  return status === "valid" && !document.review_required;
}

function errorMessage(error: unknown): string {
  if (error instanceof DocumentTrackerError) return error.message;
  return "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.";
}

export default function BetaDocumentTracker() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<MaritimeDocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<UploadJob[]>([]);
  const [processing, setProcessing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unsupported">(
    () => (typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported"),
  );

  const loadDocuments = async () => {
    if (!user) {
      setDocuments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      setDocuments(sortByExpiry(await fetchDocuments(user.id)));
    } catch {
      toast.error("Belge arşivi yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) void loadDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id]);

  const counts = useMemo(() => {
    const result = { attention: 0, valid: 0, unknown: 0 };
    for (const document of documents) {
      const { status } = getDocumentExpiryState(document.expiry_date, document.no_expiry);
      if (["expired", "critical", "warning", "upcoming"].includes(status)) result.attention += 1;
      if (status === "valid" && !document.review_required) result.valid += 1;
      if (status === "unknown" || document.review_required) result.unknown += 1;
    }
    return result;
  }, [documents]);

  const visibleDocuments = useMemo(
    () => documents.filter((document) => filterDocument(document, filter)),
    [documents, filter],
  );

  const updateJob = (id: string, state: JobState, message?: string) => {
    setJobs((current) =>
      current.map((job) => (job.id === id ? { ...job, state, message } : job)),
    );
  };

  const processFiles = async (files: File[]) => {
    if (!user || processing) return;
    const selected = files.slice(0, MAX_DOCUMENT_FILES);
    if (!selected.length) return;
    if (files.length > MAX_DOCUMENT_FILES) {
      toast.warning(`Bir seferde en fazla ${MAX_DOCUMENT_FILES} fotoğraf işlenir.`);
    }

    const pending = selected.map((file) => ({
      id: crypto.randomUUID(),
      fileName: file.name,
      state: "queued" as const,
      file,
    }));
    setJobs(pending.map(({ file: _file, ...job }) => job));
    setProcessing(true);

    let successCount = 0;
    for (const job of pending) {
      try {
        const saved = await createDocumentFromPhoto(job.file, user.id, (stage) =>
          updateJob(job.id, stage),
        );
        setDocuments((current) => sortByExpiry([...current, saved]));
        updateJob(job.id, "done", saved.title);
        successCount += 1;
      } catch (error) {
        updateJob(job.id, "error", errorMessage(error));
      }
    }

    setProcessing(false);
    if (successCount) toast.success(`${successCount} belge analiz edilip arşive eklendi`);
  };

  const handleInput = (fileList: FileList | null) => {
    if (!fileList) return;
    void processFiles(Array.from(fileList));
  };

  const handleDelete = async (document: MaritimeDocumentRecord) => {
    if (!window.confirm(`“${document.title}” belgesini ve fotoğrafını kalıcı olarak silmek istiyor musunuz?`)) {
      return;
    }
    try {
      await deleteDocument(document);
      setDocuments((current) => current.filter((item) => item.id !== document.id));
      toast.success("Belge silindi");
    } catch {
      toast.error("Belge silinemedi");
    }
  };

  const handleView = async (document: MaritimeDocumentRecord) => {
    const popup = window.open("about:blank", "_blank");
    if (popup) popup.opener = null;
    try {
      const url = await getDocumentImageUrl(document.image_path);
      if (popup) popup.location.href = url;
      else window.location.assign(url);
    } catch {
      popup?.close();
      toast.error("Belge fotoğrafı açılamadı");
    }
  };

  const enableNotifications = async () => {
    if (!("Notification" in window)) return;
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === "granted") toast.success("Belge hatırlatma bildirimleri açıldı");
    if (permission === "denied") toast.error("Bildirim izni reddedildi. Cihaz ayarlarından açabilirsiniz.");
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-7 w-7 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 py-12 dark:from-[hsl(20,40%,6%)] dark:via-[hsl(20,40%,8%)] dark:to-[hsl(20,40%,10%)]">
        <div className="mx-auto max-w-md rounded-3xl border border-border/60 bg-card/95 p-7 text-center shadow-xl">
          <LockKeyhole className="mx-auto h-11 w-11 text-amber-500" />
          <h1 className="mt-4 text-xl font-bold">Kişisel belge kasası</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Fotoğraflarınızı yalnızca sizin hesabınıza bağlı, özel bir arşivde tutmak için giriş yapın.
          </p>
          <Button className="mt-6 w-full" onClick={() => navigate("/auth?next=/beta/documents")}>
            Giriş yap
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4 pb-28 pt-[max(4rem,calc(env(safe-area-inset-top)+3.25rem))] dark:from-[hsl(20,40%,6%)] dark:via-[hsl(20,40%,8%)] dark:to-[hsl(20,40%,10%)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <header className="space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-micro font-bold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
                <Sparkles className="h-3 w-3" /> Beta · Yapay zekâ
              </div>
              <h1 className="text-2xl font-bold text-foreground">Belge ve Sertifika Takibi</h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Yalnızca fotoğrafı yükleyin. Belge türü ve geçerlilik tarihleri otomatik okunup yaklaşan süreler sıralanır.
              </p>
            </div>
            {notificationPermission !== "unsupported" && notificationPermission !== "granted" && (
              <Button variant="outline" size="sm" className="gap-2" onClick={enableNotifications}>
                <Bell className="h-4 w-4" /> Bildirimleri aç
              </Button>
            )}
            {notificationPermission === "granted" && (
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300">
                <BellRing className="h-4 w-4" /> Hatırlatmalar açık
              </div>
            )}
          </div>
        </header>

        <section className="grid grid-cols-3 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setFilter("attention")}
            className="rounded-2xl border border-amber-500/30 bg-card/90 p-3 text-left shadow-sm transition hover:border-amber-500/60"
          >
            <CalendarClock className="h-5 w-5 text-amber-500" />
            <div className="mt-2 text-xl font-bold">{counts.attention}</div>
            <div className="text-micro text-muted-foreground sm:text-xs">Yaklaşan / dolan</div>
          </button>
          <button
            type="button"
            onClick={() => setFilter("valid")}
            className="rounded-2xl border border-emerald-500/25 bg-card/90 p-3 text-left shadow-sm transition hover:border-emerald-500/55"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <div className="mt-2 text-xl font-bold">{counts.valid}</div>
            <div className="text-micro text-muted-foreground sm:text-xs">Geçerli</div>
          </button>
          <button
            type="button"
            onClick={() => setFilter("unknown")}
            className="rounded-2xl border border-slate-500/25 bg-card/90 p-3 text-left shadow-sm transition hover:border-slate-500/55"
          >
            <AlertTriangle className="h-5 w-5 text-slate-500" />
            <div className="mt-2 text-xl font-bold">{counts.unknown}</div>
            <div className="text-micro text-muted-foreground sm:text-xs">Kontrol gerekli</div>
          </button>
        </section>

        <section className="rounded-2xl border border-border/60 bg-card/90 p-4 shadow-sm sm:p-5">
          <div
            role="button"
            tabIndex={0}
            aria-label="Belge fotoğrafı yükle"
            onClick={() => !processing && inputRef.current?.click()}
            onKeyDown={(event) => {
              if ((event.key === "Enter" || event.key === " ") && !processing) inputRef.current?.click();
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              if (!processing) void processFiles(Array.from(event.dataTransfer.files));
            }}
            className={`flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
              dragging
                ? "border-amber-500 bg-amber-500/10"
                : "border-border/70 bg-background/45 hover:border-amber-500/60 hover:bg-amber-500/5"
            } ${processing ? "cursor-wait opacity-75" : ""}`}
          >
            {processing ? (
              <Loader2 className="h-9 w-9 animate-spin text-amber-500" />
            ) : (
              <div className="relative">
                <UploadCloud className="h-10 w-10 text-amber-500" />
                <Camera className="absolute -bottom-1 -right-2 h-5 w-5 rounded-full bg-card p-0.5 text-orange-500" />
              </div>
            )}
            <p className="mt-3 text-sm font-semibold">
              {processing ? "Fotoğraflar işleniyor…" : "Belge fotoğrafını çekin veya galeriden seçin"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              JPG, PNG veya WebP · en fazla {MAX_DOCUMENT_FILES} fotoğraf
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                handleInput(event.currentTarget.files);
                event.currentTarget.value = "";
              }}
            />
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-micro text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-blue-500" />
            <p>
              Fotoğraf yapay zekâ ile tarih çıkarımı için işlenir ve özel hesap arşivinizde saklanır. Sonuçlar resmi belge yerine geçmez; düşük güvenli okumalar açıkça işaretlenir.
            </p>
          </div>
        </section>

        {jobs.length > 0 && (
          <section className="space-y-2 rounded-2xl border border-border/60 bg-card/90 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Yükleme durumu</h2>
              {!processing && (
                <button type="button" onClick={() => setJobs([])} className="text-xs text-muted-foreground hover:text-foreground">
                  Temizle
                </button>
              )}
            </div>
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3">
                {job.state === "done" ? (
                  <FileCheck2 className="h-5 w-5 flex-none text-emerald-500" />
                ) : job.state === "error" ? (
                  <AlertTriangle className="h-5 w-5 flex-none text-red-500" />
                ) : (
                  <Loader2 className={`h-5 w-5 flex-none text-amber-500 ${job.state === "queued" ? "" : "animate-spin"}`} />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{job.fileName}</p>
                  <p className={`text-micro ${job.state === "error" ? "text-red-500" : "text-muted-foreground"}`}>
                    {job.message || STAGE_LABELS[job.state]}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold">Belge kasası</h2>
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["all", "Tümü"],
                  ["attention", "Yaklaşan"],
                  ["valid", "Geçerli"],
                  ["unknown", "Kontrol"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`rounded-full px-3 py-1 text-micro font-semibold transition ${
                    filter === key ? "bg-amber-500 text-white" : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border/50 bg-card/80">
              <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
            </div>
          ) : visibleDocuments.length === 0 ? (
            <EmptyState
              icon={FileImage}
              title={documents.length ? "Bu filtrede belge yok" : "Henüz belge eklenmedi"}
              description="Bir fotoğraf yüklediğinizde AI tarihleri otomatik çıkarır."
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleDocuments.map((document) => {
                const state = getDocumentExpiryState(document.expiry_date, document.no_expiry);
                const style = STATUS_STYLE[state.status];
                return (
                  <article key={document.id} className={`rounded-2xl border bg-card/95 p-4 shadow-sm ${style.border}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-1.5">
                          <span className={`rounded-full border px-2 py-0.5 text-micro font-bold uppercase tracking-wide ${style.badge}`}>
                            {style.label}
                          </span>
                          {document.review_required && (
                            <span className="rounded-full border border-slate-500/30 bg-slate-500/10 px-2 py-0.5 text-micro font-medium text-slate-600 dark:text-slate-300">
                              AI sonucunu kontrol edin
                            </span>
                          )}
                        </div>
                        <h3 className="line-clamp-2 text-sm font-bold text-foreground notranslate" translate="no" data-no-translate>{document.title}</h3>
                        <p className="mt-0.5 text-micro text-muted-foreground">{document.document_type}</p>
                      </div>
                      <div className="rounded-xl bg-amber-500/10 p-2 text-amber-600 dark:text-amber-300">
                        <FileCheck2 className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-xl bg-background/50 p-2.5">
                        <div className="text-micro uppercase tracking-wide text-muted-foreground">Son geçerlilik</div>
                        <div className="mt-1 font-semibold">{document.no_expiry ? "Süresiz" : formatDate(document.expiry_date)}</div>
                      </div>
                      <div className="rounded-xl bg-background/50 p-2.5">
                        <div className="text-micro uppercase tracking-wide text-muted-foreground">Durum</div>
                        <div className="mt-1 font-semibold">{state.label}</div>
                      </div>
                    </div>

                    <dl className="mt-3 space-y-1.5 text-micro">
                      {document.document_number && (
                        <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Belge no.</dt><dd className="truncate font-medium notranslate" translate="no" data-no-translate>{document.document_number}</dd></div>
                      )}
                      {document.holder_name && (
                        <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Belge sahibi</dt><dd className="truncate font-medium notranslate" translate="no" data-no-translate>{document.holder_name}</dd></div>
                      )}
                      {document.issuing_authority && (
                        <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Düzenleyen</dt><dd className="truncate font-medium notranslate" translate="no" data-no-translate>{document.issuing_authority}</dd></div>
                      )}
                      <div className="flex justify-between gap-3"><dt className="text-muted-foreground">AI güveni</dt><dd className="font-medium">%{Math.round(document.confidence * 100)}</dd></div>
                    </dl>

                    {(document.warnings?.length > 0 || document.review_required) && (
                      <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 text-micro text-amber-800 dark:text-amber-200">
                        {document.warnings?.[0] || "Belgedeki tarihi özgün fotoğrafla karşılaştırın."}
                      </div>
                    )}

                    <div className="mt-4 flex gap-2 border-t border-border/50 pt-3">
                      <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={() => void handleView(document)}>
                        <Eye className="h-3.5 w-3.5" /> Fotoğraf
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-500/10 hover:text-red-700"
                        onClick={() => void handleDelete(document)}
                        translate="no"
                        data-no-translate
                        aria-label={`${document.title} belgesini sil`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-micro text-muted-foreground">
          Hatırlatmalar 180, 90, 30, 7 ve 1 günlük aralıklara girildiğinde; ayrıca son gün ve süre dolduğunda bir kez gösterilir. Resmî geçerlilik kontrolünde daima belgenin aslını esas alın.
        </footer>
      </div>
    </div>
  );
}
