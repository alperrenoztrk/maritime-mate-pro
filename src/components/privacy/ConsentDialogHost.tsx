import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { onConsentRequest, type ConsentScope } from "@/lib/consent";
import { getPrivacyPolicyUrl } from "@/config/legal";
import { useLanguage } from "@/contexts/useLanguage";

/**
 * Consent texts. They state what is sent, to whom, and that the recipients are
 * outside Türkiye, before anything is sent. A change in substance needs a
 * higher CONSENT_VERSION in src/lib/consent.ts so everyone is asked again.
 */
const COPY: Record<ConsentScope, { title: string; points: string[] }> = {
  ai: {
    title: "Before you use AI features",
    points: [
      "AI answers are produced by Google Gemini through the Lovable AI Gateway. Online calculation queries are answered by Wolfram Alpha.",
      "The question you write and the lesson or calculation context sent with it go to these providers, which are located outside Türkiye (mainly in the USA).",
      "Your chat history stays on this device. Do not include personal or health information in your questions.",
      "We ask for your explicit consent for this processing and transfer abroad. You can withdraw it at any time in Settings → Privacy choices.",
    ],
  },
  documents: {
    title: "Before you upload a document",
    points: [
      "The photo is stored in your private archive (Supabase) and sent to Google Gemini through the Lovable AI Gateway to read the document's details and dates. These providers are located outside Türkiye.",
      "A seafarer document can contain special categories of personal data — for example a medical fitness certificate contains health data. It is used only to track your document expiry dates.",
      "We ask for your explicit consent for this processing and transfer abroad. You can withdraw it in Settings → Privacy choices and delete your documents at any time.",
    ],
  },
};

type Pending = { scope: ConsentScope; resolve: (granted: boolean) => void };

export function ConsentDialogHost() {
  const { currentLanguage } = useLanguage();
  const [queue, setQueue] = useState<Pending[]>([]);
  const current = queue[0];

  useEffect(() => onConsentRequest((request) => setQueue((q) => [...q, request])), []);

  const answer = (granted: boolean) => {
    if (!current) return;
    // Every queued request for the same scope gets the same answer.
    queue.filter((p) => p.scope === current.scope).forEach((p) => p.resolve(granted));
    setQueue((q) => q.filter((p) => p.scope !== current.scope));
  };

  const copy = current ? COPY[current.scope] : null;

  return (
    <Dialog open={Boolean(current)} onOpenChange={(open) => !open && answer(false)}>
      <DialogContent className="max-w-md">
        {copy ? (
          <>
            <DialogHeader className="space-y-3 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription className="sr-only">Consent request</DialogDescription>
            </DialogHeader>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {copy.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a
              href={getPrivacyPolicyUrl(currentLanguage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => answer(false)}>
                Not now
              </Button>
              <Button onClick={() => answer(true)}>I agree</Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
