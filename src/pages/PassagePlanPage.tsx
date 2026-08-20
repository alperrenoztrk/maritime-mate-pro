import { Anchor, FileText } from "lucide-react";

const fourStages = [
  { emoji: "1️⃣", title: "APPRAISAL", description: "Evaluating what to expect before sailing." },
  { emoji: "2️⃣", title: "PLANNING", description: "Creating a safe, legal and optimized route plan." },
  { emoji: "3️⃣", title: "EXECUTION", description: "Implementation of the plan and team briefing after master approval." },
  { emoji: "4️⃣", title: "MONITORING", description: "Live monitoring and recording of the plan during the navigation." },
];

const appraisalResources = [
  {
    title: "Chart & Navigation Publications",
    items: [
      "Paper Charts / ENC (ECDIS)",
      "Sailing Directions (Pilot Book)",
      "Admiralty List of Lights",
      "Admiralty List of Radio Signals",
      "Tide Tables",
      "Current Atlases",
      "Port Guide / Terminal Info",
    ],
  },
  {
    title: "Meteorology & Oceanography",
    items: [
      "NAVTEX",
      "Weather routing servisleri",
      "GRIB files",
      "Ocean current charts",
      "Seasonal weather routing (monsoon, cyclone zones)",
    ],
  },
  {
    title: "Information about the Ship",
    items: ["Draft (laden / ballast)", "Air draft", "Turning circle", "Manoeuvring booklet", "Speed / consumption"],
  },
  {
    title: "Risk Factors",
    items: [
      "TSS areas",
      "Narrow straits",
      "Shallow waters",
      "Restricted visibility areas",
      "Piracy zones",
      "Ice limits (mevsimsel)",
    ],
  },
];

const planSections = [
  {
    title: "A. ROUTE SELECTION",
    bullets: ["Great Circle / Rhumb Line decision", "Compliance with TSSs", "The safest depths", "Port approaches"],
  },
  {
    title: "B. CREATING A WAYPOINT",
    bullets: [
      "Latitude / Longitude",
      "Course (True)",
      "Distance",
      "Wheel over point",
      "XTD (Cross Track Distance) – open sea is wide, coastal/confined is kept small",
    ],
  },
  {
    title: "C. UKC (Under Keel Clearance)",
    bullets: ["Static draft", "Squat", "Tide", "Heel", "Wave response"],
  },
  {
    title: "D. SPEED & ETA PLANNING",
    bullets: ["Engine load", "Weather allowance", "Traffic allowance", "Arrival time optimization"],
  },
  {
    title: "E. DETERMINING A NO-GO AREA",
    bullets: ["Shallows", "Restricted areas", "Restricted areas", "Environmental zones", "ECDIS safety depth, contour and alarms"],
  },
  {
    title: "F. CONTINGENCY PLAN (VERY CRITICAL)",
    bullets: [
      "What happens if the machine stops?",
      "Which route if the weather is bad?",
      "Waiting area if traffic is blocked?",
    ],
  },
];

const passagePlanContents = [
  "Route overview chart",
  "Coastal / approach charts",
  "Waypoint list",
  "UKC calculation",
  "Tidal data",
  "Weather forecast",
  "Contingency plans",
  "Master’s approval & signature",
];

const roleTable = [
  { task: "Passage plan preparation", owner: "2. Kaptan", doer: "2. Kaptan" },
  { task: "Risk assessment", owner: "2/O + Master", doer: "2/O + Master" },
  { task: "Approval", owner: "Master", doer: "Master" },
  { task: "Application", owner: "OOW", doer: "OOW" },
  { task: "Monitoring", owner: "OOW", doer: "OOW" },
];

export default function PassagePlanPage() {
  return (
    <div className="min-h-screen text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Anchor className="h-4 w-4" />
          Navigation &amp; Bridge Works
        </div>

        <header className="space-y-3 rounded-2xl border border-border/60 bg-card/90 p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Passage Plan</p>
              <h1 className="text-2xl font-bold leading-tight text-foreground">Passage Plan Guide</h1>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">What is Passage Plan?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            It is the whole of the route, risks and operational limits the ship will follow throughout the voyage. It aims at safety, regulatory compliance and optimisation; it is the first document examined in PSC and vetting inspections.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">4 Main Stages of Passage Plan (IMO Standard)</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {fourStages.map((stage) => (
              <div key={stage.title} className="rounded-xl border border-border/50 bg-slate-900/60 p-4">
                <p className="text-sm font-semibold text-primary">{stage.emoji} {stage.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stage.description}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Each of these 4 steps should be documented separately.</p>
        </section>

        <section className="space-y-6 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1️⃣ APPRAISAL – EVALUATION PHASE</h2>
            <p className="text-sm text-primary">Appraisal output: “Risk map of this course”.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {appraisalResources.map((group) => (
              <div key={group.title} className="rounded-xl border border-border/50 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2️⃣ PLANNING PHASE</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {planSections.map((section) => (
              <div key={section.title} className="rounded-xl border border-border/50 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-primary/40 bg-slate-900/50 p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-primary">Contingency Plan Reminder:</p>
            <p>
              A contingency plan must be prepared for every risk: manoeuvring in the event of machinery failure, an alternative route in bad weather and a waiting area in heavy traffic. PSC inspections check this part particularly closely.
            </p>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">3️⃣ EXECUTION – APPLICATION PHASE</h2>
          <p className="text-sm text-muted-foreground">
            The plan is not put into effect until it is approved by the master. A bridge team briefing is held at this stage; the critical waypoints, UKC limits and alarm settings are passed on to the watchkeeping officers. Information is shared with the pilot if one is on board. The plan is not applied blindly; it can be revised as the situation requires and every revision is recorded.
          </p>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">4️⃣ MONITORING</h2>
          <p className="text-sm text-muted-foreground">
            The plan is monitored live during the passage. The OOW watches for XTD exceedance, course deviation, speed changes, the depth trend and the traffic situation. Any deviation is corrected and recorded, and the master is called if necessary.
          </p>
          <div className="rounded-xl border border-border/50 bg-slate-900/60 p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-primary">Tools used:</p>
            <ul className="mt-2 space-y-1">
              <li>• ECDIS, radar overlay, visual bearings</li>
              <li>• GPS / GNSS, echo sounder</li>
              <li>• Alarm limits and XTD monitoring screens</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">What Should Be in the Passage Plan File</h2>
          <ul className="mt-2 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
            {passagePlanContents.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-primary">PSC may request these elements one by one.</p>
        </section>

        <section className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Who Does What?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left">
                  <th className="py-2 pr-4 font-semibold text-foreground">Quest</th>
                  <th className="py-2 pr-4 font-semibold text-primary">Responsible</th>
                  <th className="py-2 font-semibold text-muted-foreground">Actual Doer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {roleTable.map((row) => (
                  <tr key={row.task}>
                    <td className="py-1.5 pr-4 text-foreground">{row.task}</td>
                    <td className="py-1.5 pr-4 text-primary">{row.owner}</td>
                    <td className="py-1.5 text-muted-foreground">{row.doer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Sample Passage Plan: Port Weller → Port Huron (Upbound)</h2>
          <div className="grid gap-4">
            {Array.from({ length: 44 }, (_, i) => i + 1).map((page) => (
              <div key={page} className="rounded-xl border border-border/50 bg-slate-900/60 p-2 overflow-hidden">
                <p className="text-xs text-primary mb-2 font-medium">Page {page} / 44</p>
                <img 
                  src={`/passage-plan/page_${page}.jpg`} 
                  alt={`Passage Plan Sayfa ${page}`}
                  className={`w-full rounded-lg ${page === 1 ? 'rotate-180' : ''}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">Not to be used for navigation</p>
        </section>

      </div>
    </div>
  );
}
