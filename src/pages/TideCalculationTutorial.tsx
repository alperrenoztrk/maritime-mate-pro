import { Link } from "react-router-dom";
import { Anchor, ArrowDownUp, ClipboardCheck, ListOrdered, Waves } from "lucide-react";
import { FormulaLine, ResultTable, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";

const STEPS = [
  {
    title: "1) Collect the data",
    items: [
      "Times and heights of high water (HW) and low water (LW) for the standard port, from the tide tables.",
      "The time zone of the tables (UTC or zone time) and the date.",
      "Charted depth and the chart datum of the chart in use.",
      "Secondary port time and height differences, if the place is not a standard port.",
    ],
  },
  {
    title: "2) Secondary port corrections",
    items: [
      "Standard port: use the predicted HW and LW directly.",
      "Secondary port: apply the time and height differences to the standard port HW and LW (interpolate between the tabulated values), then work as for a standard port.",
      "Write down the corrected HW and LW and the range (HW height − LW height).",
    ],
  },
  {
    title: "3) Height of tide at a given time",
    items: [
      "Find the interval from the nearest HW (Admiralty tidal curves) or from the preceding HW or LW (rule of twelfths).",
      "Tidal curve: enter the curve with the interval, read the factor and multiply it by the range; add the result to the LW height.",
      "Rule of twelfths: divide the duration into six equal tidal hours; the tide rises (or falls) 1, 2, 3, 3, 2 and 1 twelfths of the range in them.",
      "Choose the spring or neap curve, or interpolate between them, according to the day's range.",
    ],
  },
  {
    title: "4) Time for a given height",
    items: [
      "Subtract the LW height from the height required: the result as a fraction of the range is the factor.",
      "Enter the tidal curve with this factor and read the interval from HW, or find the tidal hour by the rule of twelfths.",
    ],
  },
];

/** Worked example: HW 11:38 5.5 m, LW 18:25 1.0 m, height at 15:00 by the rule of twelfths. */
const EXAMPLE = [
  { label: "Duration HW → LW", value: "6 h 47 min (407 min)" },
  { label: "One tidal hour", value: "407 / 6 = 67.8 min" },
  { label: "15:00 is after HW", value: "3 h 22 min = 2.98 tidal hours" },
  { label: "Fall so far", value: "3/12 + 0.98 × 3/12 = 0.494 of the range" },
  { label: "Range", value: "5.5 − 1.0 = 4.5 m" },
  { label: "Height of tide at 15:00", value: "5.5 − 0.494 × 4.5 = 3.27 m", emphasis: true },
];

export default function TideCalculationTutorial() {
  return (
    <ToolPage title="Tidal Calculation Step by Step" icon={Waves}>
      <ToolNotice>
        Find the height of tide at the time needed from the predicted HW and LW, then add it to the charted depth to
        check the under-keel clearance. The calculator for this page is{" "}
        <Link to="/navigation/calc/tides" className="font-medium text-primary underline-offset-2 hover:underline">Tides and Tidal Streams</Link>.
      </ToolNotice>

      {STEPS.map((step) => (
        <ToolSection key={step.title} title={step.title} icon={ListOrdered}>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
            {step.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ToolSection>
      ))}

      <ToolSection title="5) Under-keel clearance" icon={Anchor}>
        <FormulaLine>Charted depth + height of tide = draft + squat + under-keel clearance</FormulaLine>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
          <li>Depth of water = charted depth + height of tide (drying heights are subtracted).</li>
          <li>Clearance = depth of water − draft − squat − other allowances (swell, heel).</li>
          <li>If it is below the required UKC, replan the time of the passage or the route.</li>
        </ul>
      </ToolSection>

      <ToolSection title="6) Tidal streams" icon={ArrowDownUp}>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
          <li>Choose the tidal diamond nearest to the position (or use the tidal stream atlas).</li>
          <li>Find the hour before or after HW at the reference port given on the chart.</li>
          <li>Read the direction and the spring and neap rates for that hour; interpolate the rate by the day's range at that standard port.</li>
        </ul>
      </ToolSection>

      <ToolSection title="Worked example — rule of twelfths" icon={Waves} description="HW 11:38, 5.5 m · LW 18:25, 1.0 m · height of tide at 15:00">
        <ResultTable title="Height of tide" rows={EXAMPLE} />
        <ToolNotice>
          The rule of twelfths assumes a regular, symmetrical tide. Where the Admiralty Tide Tables give a tidal curve for
          the port, use the curve: it can differ by several decimetres.
        </ToolNotice>
      </ToolSection>

      <ToolSection title="Checklist" icon={ClipboardCheck}>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-6">
          <li>Times in the same zone as the tables (UTC or zone time, summer time)?</li>
          <li>Interval worked from the right HW or LW?</li>
          <li>Secondary port differences applied?</li>
          <li>Range and signs consistent; drying heights subtracted?</li>
          <li>Squat and allowances included in the clearance?</li>
        </ul>
      </ToolSection>
    </ToolPage>
  );
}
