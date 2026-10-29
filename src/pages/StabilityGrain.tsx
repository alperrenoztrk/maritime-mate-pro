import { Link } from "react-router-dom";
import { Wheat } from "lucide-react";
import { FieldGrid, FormulaLine, NumberField, ResultTable, ToolNotice, ToolPage, ToolSection } from "@/components/tools/ToolKit";
import { fmt, parseNumber, signed } from "@/components/tools/format";
import { savedGrain } from "@/components/stability/grainForms";
import { useStabilityForm } from "@/components/stability/stabilityForms";

/**
 * Practical grain check with the manual's table of maximum permissible heeling
 * moments (Grain Code A 6.3.2), entered for the ship's displacement and KG.
 */
export default function StabilityGrainPage() {
  const saved = savedGrain();
  const [form, setForm] = useStabilityForm("grain-permissible", { ghm: "", permissible: "" });
  const ghm = form.ghm ? parseNumber(form.ghm) : saved?.tonneMetres ?? Number.NaN;
  const permissible = parseNumber(form.permissible);
  const ready = Number.isFinite(ghm) && ghm > 0 && Number.isFinite(permissible) && permissible > 0;
  const margin = ready ? permissible - ghm : Number.NaN;

  return (
    <ToolPage title="Permissible Grain Moment" icon={Wheat}>
      <ToolNotice>
        The grain loading manual gives the maximum permissible heeling moment for each displacement and KG (fluid).
        Read it for the departure and arrival conditions and compare it with the actual grain heeling moment.
      </ToolNotice>
      <ToolSection title="Comparison" icon={Wheat} description="International Grain Code A 6.3.2 and A 7.">
        <FormulaLine>Actual GHM ≤ Maximum permissible heeling moment</FormulaLine>
        <FieldGrid>
          <NumberField
            id="grain-ghm"
            label="Actual grain heeling moment"
            unit="t·m"
            value={form.ghm}
            onChange={(value) => setForm((prev) => ({ ...prev, ghm: value }))}
            placeholder={saved ? fmt(saved.tonneMetres, 1) : "4500"}
            help={saved ? `Empty: ${fmt(saved.tonneMetres, 1)} t·m from Grain Heeling Moment is used.` : "From Grain Heeling Moment or the manual."}
          />
          <NumberField
            id="grain-permissible"
            label="Maximum permissible heeling moment"
            unit="t·m"
            value={form.permissible}
            onChange={(value) => setForm((prev) => ({ ...prev, permissible: value }))}
            placeholder="6200"
            help="From the manual's table at this displacement and KG fluid."
          />
        </FieldGrid>
        {ready ? (
          <ResultTable
            title="Result"
            rows={[
              { label: "Actual / permissible", value: `${fmt((ghm / permissible) * 100, 1)} %` },
              { label: "Margin", value: `${signed(margin, 1)} t·m`, emphasis: true },
              { label: "Grain Code A 7 by the manual's table", value: margin >= 0 ? "Satisfied" : "Not satisfied — reduce GHM (trim, secure surfaces) or KG" },
            ]}
          />
        ) : (
          <ToolNotice>Enter both moments.</ToolNotice>
        )}
        <ToolNotice>
          Without the manual's table, check the criteria on the GZ curve on the{" "}
          <Link to="/stability/grain-calculation" className="font-semibold text-primary underline">Grain Stability Criteria</Link> page.
        </ToolNotice>
      </ToolSection>
    </ToolPage>
  );
}
