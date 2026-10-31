import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";

const requirements = [
  { id:"structure", title:"Structure and stability", part:"SOLAS II-1",
    checks:["Verify approved damage stability information and appropriate loading documentation.", "Cross-check watertight integrity arrangements and vessel-specific test/maintenance records."] },
  { id:"fire", title:"Fire protection", part:"SOLAS II-2",
    checks:["Use the vessel's approved fire control plan to locate systems and confirm their applicable maintenance requirements.", "Verify applicable drills, inspections and deficiencies rather than assuming a universal test interval."] },
  { id:"survival", title:"Life-saving arrangements", part:"SOLAS III",
    checks:["Verify survival craft, rescue boats and launching arrangements against the ship's safety equipment certificate and approved LSA inventory.", "Confirm vessel-specific maintenance, servicing, drill and muster documentation."] },
  { id:"navigation", title:"Navigation and radiocommunications", part:"SOLAS IV–V",
    checks:["Verify navigational carriage requirements and permitted exemptions for this particular vessel.", "Verify GMDSS testing, records and emergency power provisions using the installed equipment manuals and applicable legislation."] },
];
export default function SOLASShipRequirementsPage() {
  const pages: ReadingPage[] = requirements.map((group,i)=>({
    id:group.id,title:group.title,section:`Reference ${i+1} / ${requirements.length}`,
    content:<div className="space-y-5">
      <p className="font-medium text-primary">{group.part}</p>
      <ul className="list-disc space-y-3 pl-5">{group.checks.map(x=><li key={x}>{x}</li>)}</ul>
      <p className="text-sm text-muted-foreground">Readiness percentages are not shown: without vessel records, assigning a safety compliance score would be misleading.</p>
    </div>,
  }));
  return <PagedReadingSurface title="SOLAS Ship Requirements" subtitle="Reference and verification" pages={pages} storageKey="mariners-book:solas-book:SOLASShipRequirements" />;
}
