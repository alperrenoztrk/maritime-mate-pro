import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { LibraryPageShell } from "@/components/library/LibraryInterface";
import { SIRE_PREP_GROUPS, SIRE_PREP_ITEMS } from "@/data/sireReadiness";

type SireStatus = "ready" | "follow-up";
type SireState = Record<string, SireStatus>;
const STORAGE_KEY = "mb.sire-readiness.v1";
const OFFICIAL_GUIDE = "https://www.ocimf.org/programmes/sire-2-0/";

function readState(): SireState {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      SIRE_PREP_ITEMS.filter((item) => value[item.id] === "ready" || value[item.id] === "follow-up")
        .map((item) => [item.id, value[item.id] as SireStatus])
    );
  } catch {
    return {};
  }
}

export default function SireReadinessPage() {
  const [state, setState] = useState<SireState>(readState);
  const [saveError, setSaveError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [state]);
  const reviewed = useMemo(() => Object.keys(state).length, [state]);
  const followUps = useMemo(() => Object.values(state).filter((value) => value === "follow-up").length, [state]);
  const update = (id: string, status: SireStatus) => {
    setState((old) => {
      const next = { ...old };
      if (next[id] === status) delete next[id];
      else next[id] = status;
      return next;
    });
  };
  return (
    <LibraryPageShell title="SIRE 2.0 preparation" icon={ClipboardCheck} maxWidth="max-w-4xl">
      <SEO title="SIRE 2.0 preparation — Mariner's Book" description="Independent tanker vetting readiness prompts and links to current OCIMF guidance." path="/inspections/sire-readiness" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        This independent tanker vetting preparation aid is not an official OCIMF questionnaire, inspection or compliance determination.
        SIRE 2.0 uses a vessel-specific compiled questionnaire (CVIQ); completing these prompts does not guarantee inspection readiness.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/85 p-4">
        <div>
          <p className="font-semibold">{reviewed} of {SIRE_PREP_ITEMS.length} reviewed</p>
          <p className="text-xs text-muted-foreground">{followUps} follow-up items. Status is stored only on this device.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { if (window.confirm("Clear all SIRE readiness marks on this device?")) setState({}); }}>
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
      {saveError && <p role="alert" className="text-sm text-destructive">Device storage is unavailable. Changes may not persist.</p>}
      {SIRE_PREP_GROUPS.map((group) => (
        <section key={group.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/85">
          <h2 className="border-b border-border/60 px-4 py-3 text-base font-semibold">{group.title}</h2>
          <ul className="divide-y divide-border/50">
            {group.items.map((item) => (
              <li key={item.id} className="space-y-3 p-4">
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.guidance}</p>
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label={"Status for " + item.title}>
                  <Button size="sm" variant={state[item.id] === "ready" ? "default" : "outline"} aria-pressed={state[item.id] === "ready"} onClick={() => update(item.id, "ready")}>Reviewed</Button>
                  <Button size="sm" variant={state[item.id] === "follow-up" ? "destructive" : "outline"} aria-pressed={state[item.id] === "follow-up"} onClick={() => update(item.id, "follow-up")}>Needs follow-up</Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div className="space-y-2 text-sm text-muted-foreground">
        <a className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline" href={OFFICIAL_GUIDE} target="_blank" rel="noopener noreferrer">
          OCIMF SIRE 2.0 official programme resources <ExternalLink className="h-4 w-4" />
        </a>
        <p>Consult the current OCIMF programme documents and your company procedures. No operational documents or photographs are uploaded through this page.</p>
        <Link className="block font-medium text-primary underline-offset-4 hover:underline" to="/beta/psc-checklist">Port State Control preparation is a separate process</Link>
      </div>
    </LibraryPageShell>
  );
}
