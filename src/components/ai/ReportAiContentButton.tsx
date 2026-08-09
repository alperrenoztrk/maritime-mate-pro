import { useState } from "react";
import { Flag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  NotSignedInError,
  submitAiContentReport,
  type AiReportReason,
  type AiSurface,
} from "@/services/aiContentReport";

/**
 * "Bu yanıtı bildir" düğmesi.
 *
 * Google Play'in Üretken Yapay Zekâ politikası, AI üretimi rahatsız edici
 * içeriğin uygulama içinden bildirilebilmesini zorunlu tutuyor. Bu bileşen
 * AI yanıtı gösteren HER yüzeye eklenir; bildirim `ai_content_reports`
 * tablosuna yazılır.
 *
 * Denizcilik bağlamında "yanlış bilgi" seçeneği rahatsız edici içerik kadar
 * önemli: hatalı bir stabilite/COLREG yanıtı gerçek bir emniyet riskidir.
 */

const REASONS: Array<{ value: AiReportReason; label: string; hint: string }> = [
  {
    value: "inaccurate",
    label: "Yanlış bilgi",
    hint: "Denizcilik açısından hatalı hesap, kural veya tanım",
  },
  {
    value: "unsafe",
    label: "Emniyetsiz tavsiye",
    hint: "Uygulanırsa can, mal veya çevre güvenliğini riske atar",
  },
  {
    value: "offensive",
    label: "Rahatsız edici içerik",
    hint: "Hakaret, nefret söylemi veya uygunsuz ifade",
  },
  { value: "other", label: "Diğer", hint: "Yukarıdakilerin dışında bir sorun" },
];

interface ReportAiContentButtonProps {
  /** Bildirilecek AI yanıtı. Boşsa düğme gösterilmez. */
  content: string;
  /** Yanıtı doğuran soru veya seçilen metin (varsa). */
  prompt?: string;
  surface: AiSurface;
  /** Koyu zeminli panellerde (ör. AskAIPopup) kontrast için. */
  tone?: "default" | "onDark";
  className?: string;
}

export function ReportAiContentButton({
  content,
  prompt,
  surface,
  tone = "default",
  className = "",
}: ReportAiContentButtonProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<AiReportReason>("inaccurate");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  if (!content?.trim()) return null;

  const handleSubmit = async () => {
    setSending(true);
    try {
      await submitAiContentReport({ surface, reason, content, prompt, note });
      toast.success("Bildiriminiz alındı. İncelenmek üzere kaydedildi.");
      setOpen(false);
      setNote("");
      setReason("inaccurate");
    } catch (err) {
      if (err instanceof NotSignedInError) {
        toast.error(err.message);
      } else {
        toast.error("Bildirim gönderilemedi. Bağlantınızı kontrol edip tekrar deneyin.");
      }
    } finally {
      setSending(false);
    }
  };

  const triggerClass =
    tone === "onDark"
      ? "text-gray-400 hover:text-gray-200"
      : "text-muted-foreground/70 hover:text-foreground";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Bu yapay zekâ yanıtını bildir"
        title="Bu yanıtı bildir"
        className={`inline-flex items-center gap-1 text-micro transition-colors ${triggerClass} ${className}`}
      >
        <Flag className="h-3 w-3" />
        Bildir
      </button>

      <Dialog open={open} onOpenChange={(next) => !sending && setOpen(next)}>
        {/*
          `data-ask-ai-popup`: DialogContent portal ile <body>'ye taşınır, yani
          AskAIPopup'ın DOM ağacının dışında kalır. useTextSelection, bu
          işaretçiyi taşımayan bir hedefe tıklandığında metin seçimini
          temizliyor — bu da bildirim penceresi açıkken AskAIPopup'ı (ve onunla
          birlikte bu pencereyi) kapatırdı. İşaretçi pencereyi ayakta tutar;
          diğer yüzeylerde hiçbir etkisi yok.
        */}
        <DialogContent className="max-w-md" data-ask-ai-popup="true">
          <DialogHeader>
            <DialogTitle>Yapay zekâ yanıtını bildir</DialogTitle>
            <DialogDescription>
              Yapay zekâ hata yapabilir. Sorunlu bulduğunuz yanıtı bildirin; inceleyip
              düzeltiyoruz. Yanıtın metni bildirimle birlikte kaydedilir.
            </DialogDescription>
          </DialogHeader>

          <fieldset className="space-y-2" disabled={sending}>
            <legend className="sr-only">Bildirim nedeni</legend>
            {REASONS.map((r) => (
              <label
                key={r.value}
                className={`flex cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 transition-colors ${
                  reason === r.value
                    ? "border-primary/60 bg-primary/5"
                    : "border-border/60 hover:bg-muted/40"
                }`}
              >
                <input
                  type="radio"
                  name="ai-report-reason"
                  value={r.value}
                  checked={reason === r.value}
                  onChange={() => setReason(r.value)}
                  className="mt-1 h-3.5 w-3.5 accent-[hsl(var(--primary))]"
                />
                <span>
                  <span className="block text-sm font-medium text-foreground">{r.label}</span>
                  <span className="block text-xs text-muted-foreground">{r.hint}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 1000))}
            disabled={sending}
            rows={3}
            placeholder="İsterseniz kısaca açıklayın (isteğe bağlı)"
            className="text-sm"
          />

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={sending}>
              Vazgeç
            </Button>
            <Button onClick={handleSubmit} disabled={sending}>
              {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {sending ? "Gönderiliyor…" : "Bildir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReportAiContentButton;
