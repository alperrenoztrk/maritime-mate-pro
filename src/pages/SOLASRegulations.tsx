import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";

const chapters = [
  { id: "I", title: "General provisions", summary: "Surveys, certificates and convention application.",
    checks: ["Check applicability for the actual ship, voyage and flag.", "Check valid certificates, endorsements and recorded survey results."] },
  { id: "II-1", title: "Construction, machinery and stability", summary: "Subdivision, stability, machinery and electrical installation provisions.",
    checks: ["Compare the ship's configuration with approved documentation.", "Verify relevant structural, watertight and machinery records."] },
  { id: "II-2", title: "Fire protection and firefighting", summary: "Structural fire protection, detection and firefighting arrangements.",
    checks: ["Cross-check the approved fire control plan and installed equipment.", "Review maintenance and test records against the ship's applicable requirements."] },
  { id: "III", title: "Life-saving appliances and arrangements", summary: "Survival craft, rescue boats, personal appliances, drills and inspections.",
    checks: ["Apply SOLAS III/21 or III/31 as appropriate: survival craft capacity varies by ship type, configuration and permitted alternatives; there is no universal complement × 1.25 lifeboat rule.", "Compare onboard certificates and passenger/crew capacity with flag-approved arrangements.", "Verify muster lists and service records."] },
  { id: "IV", title: "Radiocommunications", summary: "GMDSS equipment and watchkeeping applicable to the vessel's sea areas.",
    checks: ["Check the radio survey certificate and the applicable sea area.", "Verify tests and records required by the actual equipment installation."] },
  { id: "V", title: "Safety of navigation", summary: "Passage planning, bridge equipment and navigational operational procedures.",
    checks: ["Verify required equipment and approved alternative arrangements.", "Check passage plans, charts and navigational publications are current."] },
] as const;

export default function SOLASRegulationsPage() {
  const pages: ReadingPage[] = chapters.map((chapter, index) => ({
    id: chapter.id, title: `SOLAS Chapter ${chapter.id} — ${chapter.title}`,
    section: `Chapter ${index + 1} / ${chapters.length}`,
    content: <div className="space-y-5">
      <p>{chapter.summary}</p>
      <h3 className="text-sm font-semibold">Verification on board</h3>
      <ul className="list-disc space-y-3 pl-5">{chapter.checks.map((v) => <li key={v}>{v}</li>)}</ul>
      <p className="text-sm text-muted-foreground">This is a study checklist, not evidence of compliance or a complete legal instrument. Apply current amendments, flag directions, the ship's certificates and approved plans.</p>
      <a href="https://www.imo.org/en/ourwork/safety/pages/summaryofsolaschapter-3-default.aspx" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline">IMO — Chapter III official summary</a>
    </div>,
  }));
  return <PagedReadingSurface title="SOLAS — Chapter Reference" subtitle="Maritime regulations" pages={pages} storageKey="mariners-book:solas-book:SOLASRegulations" />;
}
