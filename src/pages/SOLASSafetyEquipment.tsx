import { PagedReadingSurface, type ReadingPage } from "@/components/reader/PagedReadingSurface";

const groups = [
  { id: "lifesaving", title: "Life-saving appliances", reference: "SOLAS Chapter III / LSA Code",
    checks: ["Confirm survival craft and rescue boat type, number and aggregate capacity using the vessel's approved arrangement and the applicable SOLAS III/21 or III/31.", "Verify liferaft servicing, HRU expiry, release gear, passenger/crew complement and manufacturer maintenance instructions.", "Check immersion suits, lifejackets, lifebuoys, distress signals and muster arrangements against the approved safety equipment list."] },
  { id: "fire", title: "Fire protection and extinguishing", reference: "SOLAS Chapter II-2 / FSS Code",
    checks: ["Compare installed fixed systems and portable equipment with the approved Fire Control Plan.", "Verify inspection logs, applicable service intervals and the maker's test procedure; fixed gas systems must not be test-operated casually.", "Check fire detection, pumps, hydrants, hoses, breathing apparatus and equipment familiarization."] },
  { id: "radio", title: "Emergency communications", reference: "SOLAS Chapter IV / GMDSS",
    checks: ["Check the applicable sea area and ship radio equipment requirements.", "Verify EPIRB, SART or AIS-SART and survival craft radio arrangements against the applicable carriage rules.", "Cross-check batteries, expiry dates and test records; follow manufacturer-approved self-test instructions."] },
];
export default function SOLASSafetyEquipmentPage() {
  const pages: ReadingPage[] = groups.map((g, i) => ({
    id: g.id, title: g.title, section: `Reference ${i + 1} / ${groups.length}`,
    content: <div className="space-y-5">
      <p className="font-medium text-primary">{g.reference}</p>
      <ul className="list-disc space-y-3 pl-5">{g.checks.map(x=><li key={x}>{x}</li>)}</ul>
      <p className="text-sm text-muted-foreground">No equipment quantities, service dates or 'operational' status are assumed without actual vessel records. This screen is educational, not a live inventory.</p>
      <a href="https://www.imo.org/en/ourwork/safety/pages/lifesavingappliances-default.aspx" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary underline">IMO — Life-saving appliances</a>
    </div>,
  }));
  return <PagedReadingSurface title="SOLAS Safety Equipment" subtitle="Safety reference" pages={pages} storageKey="mariners-book:solas-book:SOLASSafetyEquipment" />;
}
