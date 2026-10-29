import { supabase } from "@/integrations/supabase/safeClient";
import { safeLocalStorage } from "@/lib/safeStorage";

/**
 * Explicit consent (KVKK "açık rıza") for processing that the privacy policy
 * bases on consent:
 *
 *  - "ai":        AI answers and online calculations. The question and the
 *                 context sent with it go to Google Gemini (through the Lovable
 *                 AI Gateway) and, for calculation queries, Wolfram Alpha —
 *                 providers outside Türkiye.
 *  - "documents": Document Tracker uploads. The photo is stored in the user's
 *                 private archive and read by Google Gemini; a seafarer
 *                 document can be a medical certificate (health data, a
 *                 special category under KVKK).
 *
 * Consent is asked once per scope, before the first request, and can be
 * withdrawn in Settings → Privacy choices. The decision is kept on the device
 * and in the account's metadata (auth user_metadata.consents) so it follows
 * the account and is on record. Raising CONSENT_VERSION asks everyone again —
 * do that whenever the text in ConsentDialogHost changes in substance.
 */
export type ConsentScope = "ai" | "documents";

export const CONSENT_VERSION = 1;

export type ConsentRecord = { granted: boolean; version: number; at: string };

type ConsentMap = Partial<Record<ConsentScope, ConsentRecord>>;

/** Thrown when the user declines; nothing has been sent at that point. */
export class ConsentDeclinedError extends Error {
  constructor(public readonly scope: ConsentScope) {
    super(
      scope === "documents"
        ? "Document upload needs your consent. Nothing was uploaded."
        : "AI features need your consent. Nothing was sent.",
    );
    this.name = "ConsentDeclinedError";
  }
}

const storageKey = (userId: string | null) => `mb.consent.v1.${userId ?? "signed-out"}`;

const readLocal = (userId: string | null): ConsentMap => {
  try {
    const raw = safeLocalStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as ConsentMap) : {};
  } catch {
    return {};
  }
};

const writeLocal = (userId: string | null, map: ConsentMap) => {
  try {
    safeLocalStorage.setItem(storageKey(userId), JSON.stringify(map));
  } catch {
    // Storage disabled: the account copy below still records the decision.
  }
};

const isCurrent = (record?: ConsentRecord) =>
  Boolean(record?.granted && record.version >= CONSENT_VERSION);

async function currentUser() {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.user ?? null;
  } catch {
    return null;
  }
}

/** The stored decision for each scope (account copy wins over the device copy). */
export async function readConsents(): Promise<ConsentMap> {
  const user = await currentUser();
  const local = readLocal(user?.id ?? null);
  const remote = ((user?.user_metadata as { consents?: ConsentMap } | undefined)?.consents ?? {}) as ConsentMap;
  const merged: ConsentMap = { ...local };
  for (const scope of Object.keys(remote) as ConsentScope[]) {
    const r = remote[scope];
    const l = local[scope];
    if (r && (!l || new Date(r.at).getTime() >= new Date(l.at).getTime())) merged[scope] = r;
  }
  return merged;
}

export async function hasConsent(scope: ConsentScope): Promise<boolean> {
  return isCurrent((await readConsents())[scope]);
}

/** Records a decision on the device and, when online, on the account. */
export async function recordConsent(scope: ConsentScope, granted: boolean): Promise<void> {
  const user = await currentUser();
  const record: ConsentRecord = { granted, version: CONSENT_VERSION, at: new Date().toISOString() };
  const local = { ...readLocal(user?.id ?? null), [scope]: record };
  writeLocal(user?.id ?? null, local);
  notifyChange();
  if (!user) return;
  try {
    const remote = ((user.user_metadata as { consents?: ConsentMap } | undefined)?.consents ?? {}) as ConsentMap;
    await supabase.auth.updateUser({ data: { consents: { ...remote, [scope]: record } } });
  } catch {
    // Offline: the device copy stands and is sent with the next decision.
  }
}

// ── Asking ────────────────────────────────────────────────────────────────
// The dialog lives in ConsentDialogHost (mounted once in App). Requests are
// queued so two features asking at once get one answer each.

type Request = { scope: ConsentScope; resolve: (granted: boolean) => void };
const requestListeners = new Set<(request: Request) => void>();
const changeListeners = new Set<() => void>();

export function onConsentRequest(listener: (request: Request) => void): () => void {
  requestListeners.add(listener);
  return () => requestListeners.delete(listener);
}

export function onConsentChange(listener: () => void): () => void {
  changeListeners.add(listener);
  return () => changeListeners.delete(listener);
}

function notifyChange() {
  changeListeners.forEach((listener) => listener());
}

/** Shows the consent dialog and resolves with the user's answer. */
export function askConsent(scope: ConsentScope): Promise<boolean> {
  if (requestListeners.size === 0) return Promise.resolve(false);
  return new Promise((resolve) => {
    requestListeners.forEach((listener) => listener({ scope, resolve }));
  });
}

/**
 * Call before sending anything for a consent-based feature. Resolves when
 * consent is on record (asking first if needed); throws ConsentDeclinedError
 * otherwise, before any data leaves the device.
 */
export async function requireConsent(scope: ConsentScope): Promise<void> {
  if (await hasConsent(scope)) return;
  const granted = await askConsent(scope);
  if (granted) {
    await recordConsent(scope, true);
    return;
  }
  throw new ConsentDeclinedError(scope);
}
