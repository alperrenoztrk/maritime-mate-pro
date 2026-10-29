import type { Dispatch, SetStateAction } from "react";
import { Gauge, Ruler, Ship, TableProperties, Waves } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LcfReference } from "@/lib/calc/draftSurvey";
import {
  FieldGrid,
  NumberField,
  ResultTable,
  ToolNotice,
  ToolSection,
} from "@/components/tools/ToolKit";
import {
  computeStage,
  parseShip,
  rowsToText,
  stageRows,
  stageWarnings,
  type ShipForm,
  type StageField,
  type StageForm,
} from "./draftSurveyForms";

const LCF_OPTIONS: Array<{ value: LcfReference; label: string }> = [
  { value: "midships-aft-positive", label: "From amidships, + aft" },
  { value: "midships-forward-positive", label: "From amidships, + forward" },
  { value: "from-aft-perpendicular", label: "From the aft perpendicular" },
];

export function ShipParticularsSection({
  form,
  setForm,
  showLightship = false,
}: {
  form: ShipForm;
  setForm: Dispatch<SetStateAction<ShipForm>>;
  showLightship?: boolean;
}) {
  const { errors } = parseShip(form);
  const set = (key: keyof ShipForm) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <ToolSection
      title="Ship particulars"
      icon={Ship}
      description="From the ship's hydrostatic tables and draft mark plan. Saved on this device and shared by all draft survey tools."
    >
      <FieldGrid>
        <NumberField id="ship-lbp" label="Length between perpendiculars (LBP)" unit="m" value={form.lbp} onChange={set("lbp")} placeholder="180.00" error={form.lbp ? errors.lbp : undefined} />
        <NumberField id="ship-table-density" label="Hydrostatic table density" unit="t/m³" value={form.tableDensity} onChange={set("tableDensity")} placeholder="1.025" error={errors.tableDensity} />
        <NumberField id="ship-fwd-mark" label="Forward marks aft of FP" unit="m" value={form.forwardMark} onChange={set("forwardMark")} placeholder="2.00" help="Negative if the marks are forward of the FP." error={form.forwardMark ? errors.forwardMark : undefined} />
        <NumberField id="ship-aft-mark" label="Aft marks forward of AP" unit="m" value={form.aftMark} onChange={set("aftMark")} placeholder="6.00" help="Negative if the marks are aft of the AP." error={form.aftMark ? errors.aftMark : undefined} />
        <NumberField id="ship-mid-mark" label="Midship marks aft of amidships" unit="m" value={form.midMark} onChange={set("midMark")} placeholder="0.00" help="Negative if forward of amidships; 0 if on amidships." error={errors.midMark} />
        <NumberField id="ship-keel" label="Keel correction" unit="m" value={form.keelCorrection} onChange={set("keelCorrection")} placeholder="0.00" help="Keel plate thickness if the tables are on moulded draft; otherwise 0." />
        {showLightship && (
          <NumberField id="ship-lightship" label="Lightship displacement" unit="t" value={form.lightship} onChange={set("lightship")} placeholder="9800" help="From the stability booklet." />
        )}
        <div className="space-y-1">
          <Label className="text-xs">LCF in the hydrostatic table</Label>
          <Select value={form.lcfReference} onValueChange={(value) => setForm((prev) => ({ ...prev, lcfReference: value as LcfReference }))}>
            <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              {LCF_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </FieldGrid>
    </ToolSection>
  );
}

/** The input part of one survey (readings, density, tables, deductibles) and its computed breakdown. */
export function SurveyStageSection({
  title,
  idPrefix,
  shipForm,
  form,
  setForm,
}: {
  title: string;
  idPrefix: string;
  shipForm: ShipForm;
  form: StageForm;
  setForm: Dispatch<SetStateAction<StageForm>>;
}) {
  const computation = computeStage(shipForm, form);
  const errors = computation.errors;
  const field = (key: StageField, label: string, unit: string, placeholder: string, help?: string) => (
    <NumberField
      id={`${idPrefix}-${key}`}
      label={label}
      unit={unit}
      value={form[key]}
      onChange={(value) => setForm((prev) => ({ ...prev, [key]: value }))}
      placeholder={placeholder}
      help={help}
      error={form[key] !== "" ? errors[key] : undefined}
    />
  );
  const rows = computation.result ? stageRows(computation.result) : null;
  const warnings = computation.result ? stageWarnings(computation.result, form) : [];

  return (
    <div className="space-y-4">
      <ToolSection title={`${title}: draft readings`} icon={Ruler} description="Read both sides at each mark, in calm conditions where possible.">
        <FieldGrid>
          {field("forwardPort", "Forward, port", "m", "7.00")}
          {field("forwardStarboard", "Forward, starboard", "m", "7.02")}
          {field("midPort", "Midship, port", "m", "7.52")}
          {field("midStarboard", "Midship, starboard", "m", "7.48")}
          {field("aftPort", "Aft, port", "m", "8.04")}
          {field("aftStarboard", "Aft, starboard", "m", "7.96")}
        </FieldGrid>
        {field("dockDensity", "Dock water density", "t/m³", "1.018", "Average of the samples taken at the draft marks.")}
      </ToolSection>

      <ToolSection
        title={`${title}: hydrostatics`}
        icon={TableProperties}
        description="Enter the two table rows that bracket the draft for hydrostatic table shown below; values are interpolated linearly."
      >
        <FieldGrid>
          {field("row1Draft", "Row 1 draft", "m", "7.50")}
          {field("row2Draft", "Row 2 draft", "m", "7.60")}
          {field("row1Displacement", "Row 1 displacement", "t", "30000")}
          {field("row2Displacement", "Row 2 displacement", "t", "30400")}
          {field("row1Tpc", "Row 1 TPC", "t/cm", "40.00")}
          {field("row2Tpc", "Row 2 TPC", "t/cm", "40.20")}
          {field("row1Lcf", "Row 1 LCF", "m", "2.00")}
          {field("row2Lcf", "Row 2 LCF", "m", "1.90")}
          {field("mtcPlus50", "MCTC at draft + 0.50 m", "t·m/cm", "420", "For the second trim correction.")}
          {field("mtcMinus50", "MCTC at draft − 0.50 m", "t·m/cm", "405")}
        </FieldGrid>
      </ToolSection>

      <ToolSection title={`${title}: deductibles`} icon={Gauge} description="Quantities on board at the time of the survey, from soundings and tank tables.">
        <FieldGrid columns={3}>
          {field("ballast", "Ballast water", "t", "0")}
          {field("freshWater", "Fresh water", "t", "0")}
          {field("fuelOil", "Fuel oil", "t", "0")}
          {field("dieselOil", "Diesel oil", "t", "0")}
          {field("lubOil", "Lubricating oil", "t", "0")}
          {field("bilges", "Bilges / slops", "t", "0")}
          {field("other", "Other", "t", "0")}
        </FieldGrid>
      </ToolSection>

      {computation.message && <ToolNotice tone="warning">{computation.message}</ToolNotice>}
      {warnings.map((warning) => (
        <ToolNotice key={warning} tone="warning">{warning}</ToolNotice>
      ))}
      {rows && <ResultTable title={`${title}: result`} rows={rows} copyText={rowsToText(title, rows)} />}
    </div>
  );
}

export function DraftSurveyDisclaimer() {
  return (
    <ToolNotice>
      <p className="flex items-center gap-1 font-semibold"><Waves className="h-3.5 w-3.5" aria-hidden /> UNECE draught survey procedure (1992)</p>
      <p>
        For training and cross-checking. The official figures are those agreed in the survey report using the
        ship's approved hydrostatic tables, sounding tables and calibrated instruments.
      </p>
    </ToolNotice>
  );
}
