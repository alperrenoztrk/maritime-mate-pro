/**
 * Original preparation prompts, not a reproduction of the OCIMF question library.
 * A SIRE 2.0 CVIQ is generated per vessel by OCIMF; this list cannot predict it.
 */
export interface SirePrepItem { id: string; title: string; guidance: string }
export interface SirePrepGroup { id: string; title: string; items: SirePrepItem[] }

export const SIRE_PREP_GROUPS: readonly SirePrepGroup[] = [
  {
    id: "records", title: "Operator-supplied information", items: [
      { id: "hvpq", title: "Review HVPQ particulars", guidance: "Confirm vessel particulars agree with current vessel documents and equipment." },
      { id: "piq", title: "Prepare the PIQ", guidance: "Coordinate accurate recent operational information with the vessel operator." },
      { id: "certificates", title: "Verify certificate repository", guidance: "Identify expired, superseded or missing statutory and trading documents." },
      { id: "photographs", title: "Review photograph repository", guidance: "Confirm that submitted images fairly represent actual vessel condition." },
      { id: "declaration", title: "Check operator inspection declaration", guidance: "Verify consistency of declarations with the underlying evidence." }
    ]
  },
  {
    id: "onboard", title: "Onboard readiness", items: [
      { id: "navigation", title: "Review bridge procedures and records", guidance: "Rehearse how the crew locates supporting records and explains normal practice." },
      { id: "cargo", title: "Review tanker cargo and mooring arrangements", guidance: "Use approved ship-specific manuals, risk assessments and operating limits." },
      { id: "machinery", title: "Review machinery and safety-critical equipment", guidance: "Compare physical condition, tests and maintenance evidence with the records." },
      { id: "crew", title: "Prepare crew for task explanations", guidance: "Crew should demonstrate actual safe practices, not memorised scripted answers." },
      { id: "followup", title: "Review prior findings and corrective actions", guidance: "Identify open deficiencies and verify effectiveness of completed actions." }
    ]
  }
];

export const SIRE_PREP_ITEMS = SIRE_PREP_GROUPS.flatMap((group) => group.items);
