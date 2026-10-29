import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  askConsent,
  CONSENT_VERSION,
  onConsentChange,
  readConsents,
  recordConsent,
  type ConsentScope,
} from "@/lib/consent";

const ROWS: { scope: ConsentScope; label: string; note: string }[] = [
  {
    scope: "ai",
    label: "AI features",
    note: "Questions are sent to Google Gemini and Wolfram Alpha outside Türkiye.",
  },
  {
    scope: "documents",
    label: "Document uploads",
    note: "Document photos are stored and read by Google Gemini outside Türkiye. Withdrawing consent does not delete documents already uploaded; delete them in the Document Tracker.",
  },
];

/**
 * Settings → Privacy choices. Shows each consent-based processing and lets the
 * user withdraw or give consent at any time (KVKK: consent can be withdrawn as
 * easily as it was given).
 */
export function PrivacyChoices() {
  const [granted, setGranted] = useState<Partial<Record<ConsentScope, boolean>>>({});
  const [busy, setBusy] = useState<ConsentScope | null>(null);

  const refresh = useCallback(async () => {
    const consents = await readConsents();
    setGranted({
      ai: Boolean(consents.ai?.granted && consents.ai.version >= CONSENT_VERSION),
      documents: Boolean(consents.documents?.granted && consents.documents.version >= CONSENT_VERSION),
    });
  }, []);

  useEffect(() => {
    void refresh();
    return onConsentChange(() => void refresh());
  }, [refresh]);

  const toggle = async (scope: ConsentScope) => {
    setBusy(scope);
    try {
      if (granted[scope]) {
        await recordConsent(scope, false);
      } else if (await askConsent(scope)) {
        await recordConsent(scope, true);
      }
    } finally {
      setBusy(null);
      void refresh();
    }
  };

  return (
    <section className="space-y-2 rounded-xl border border-border/60 p-3" aria-labelledby="privacy-choices">
      <h3 id="privacy-choices" className="text-sm font-semibold">
        Privacy choices
      </h3>
      {ROWS.map(({ scope, label, note }) => (
        <div key={scope} className="flex items-start justify-between gap-3 border-t border-border/40 pt-2 first-of-type:border-t-0">
          <div className="min-w-0">
            <p className="text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">
              {granted[scope] ? "Consent given. " : "No consent. "}
              {note}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={busy === scope}
            onClick={() => void toggle(scope)}
            className="shrink-0"
          >
            {granted[scope] ? "Withdraw" : "Give consent"}
          </Button>
        </div>
      ))}
    </section>
  );
}
