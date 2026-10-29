import { ClipboardList, Package, Scale } from "lucide-react";
import { shipsConstant } from "@/lib/calc/draftSurvey";
import {
  FieldGrid,
  FormulaLine,
  NumberField,
  ResultTable,
  ToolNotice,
  ToolPage,
  ToolSection,
  type ResultRow,
} from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { DraftSurveyDisclaimer, ShipParticularsSection, SurveyStageSection } from "@/components/draftSurvey/DraftSurveySections";
import { computeStage, emptyShip, emptyStage, parseShip, rowsToText, useStoredForm } from "@/components/draftSurvey/draftSurveyForms";

const DEPARTURE_FIELDS = [
  ["ballast", "Ballast water"],
  ["freshWater", "Fresh water"],
  ["fuelOil", "Fuel oil"],
  ["dieselOil", "Diesel oil"],
  ["lubOil", "Lubricating oil"],
  ["other", "Stores / other"],
] as const;

type DepartureKey = (typeof DEPARTURE_FIELDS)[number][0];

export default function DraftSurveyPreloading() {
  const [ship, setShip] = useStoredForm("ship", emptyShip);
  const [initial, setInitial] = useStoredForm("initial", emptyStage());
  const [plan, setPlan] = useStoredForm("intake-plan", {
    permittedDisplacement: "",
    ballast: "0",
    freshWater: "0",
    fuelOil: "0",
    dieselOil: "0",
    lubOil: "0",
    other: "0",
  });
  const { lightship } = parseShip(ship);
  const initialResult = computeStage(ship, initial).result;
  const constant = initialResult && lightship !== undefined ? shipsConstant(initialResult.netDisplacement, lightship) : undefined;

  const permitted = parseNumber(plan.permittedDisplacement);
  const departure = DEPARTURE_FIELDS.reduce((sum, [key]) => sum + (parseNumber(plan[key]) || 0), 0);
  let intake: ResultRow[] | null = null;
  if (constant !== undefined && lightship !== undefined && Number.isFinite(permitted) && permitted > 0) {
    const cargo = permitted - lightship - constant - departure;
    intake = [
      { label: "Displacement at permitted draft", value: `${fmt(permitted, 1)} t` },
      { label: "Lightship", value: `${fmt(lightship, 1)} t` },
      { label: "Ship's constant", value: `${fmt(constant, 1)} t` },
      { label: "Departure deductibles", value: `${fmt(departure, 1)} t` },
      { label: "Maximum cargo intake", value: `${fmt(cargo, 1)} t`, emphasis: true },
    ];
  }

  const setPlanField = (key: "permittedDisplacement" | DepartureKey) => (value: string) =>
    setPlan((prev) => ({ ...prev, [key]: value }));

  const constantRows: ResultRow[] | null =
    initialResult && constant !== undefined && lightship !== undefined
      ? [
          { label: "Net displacement (light condition)", value: `${fmt(initialResult.netDisplacement, 1)} t` },
          { label: "Lightship", value: `${fmt(lightship, 1)} t` },
          { label: "Ship's constant", value: `${signed(constant, 1)} t`, emphasis: true },
        ]
      : null;

  return (
    <ToolPage title="Initial (Light) Survey" icon={ClipboardList}>
      <DraftSurveyDisclaimer />
      <ShipParticularsSection form={ship} setForm={setShip} showLightship />
      <SurveyStageSection title="Initial survey" idPrefix="initial" shipForm={ship} form={initial} setForm={setInitial} />

      <ToolSection title="Ship's constant" icon={Scale} description="Unknown weights on board (stores, spares, sediment, unpumpable water) found by the light survey.">
        <FormulaLine>Constant = Net Δ (light survey) − Lightship</FormulaLine>
        {constantRows ? (
          <>
            <ResultTable title="Constant" rows={constantRows} copyText={rowsToText("Ship's constant", constantRows)} />
            {constant !== undefined && constant < 0 && (
              <ToolNotice tone="warning">A negative constant usually points to a reading, density or deductible error: recheck before loading.</ToolNotice>
            )}
          </>
        ) : (
          <ToolNotice>Enter the lightship in the ship particulars and complete the initial survey.</ToolNotice>
        )}
      </ToolSection>

      <ToolSection
        title="Cargo intake plan"
        icon={Package}
        description="Displacement at the draft permitted by the load line zone, port or channel limits, taken from the hydrostatic tables in the same water density."
      >
        <FormulaLine>Cargo = Δ permitted − Lightship − Constant − Departure deductibles</FormulaLine>
        <NumberField
          id="intake-permitted"
          label="Displacement at permitted draft"
          unit="t"
          value={plan.permittedDisplacement}
          onChange={setPlanField("permittedDisplacement")}
          placeholder="47500"
        />
        <FieldGrid columns={3}>
          {DEPARTURE_FIELDS.map(([key, label]) => (
            <NumberField key={key} id={`intake-${key}`} label={`${label} at departure`} unit="t" value={plan[key]} onChange={setPlanField(key)} placeholder="0" />
          ))}
        </FieldGrid>
        {intake ? (
          <ResultTable title="Cargo intake" rows={intake} copyText={rowsToText("Cargo intake plan", intake)} />
        ) : (
          <ToolNotice>Complete the ship's constant and enter the displacement at the permitted draft.</ToolNotice>
        )}
        <ToolNotice>
          Check the loading plan against the stability booklet or loading computer (GM, shear forces, bending moments)
          before accepting the intake figure.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
