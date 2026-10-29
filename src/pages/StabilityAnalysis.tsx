import { Link } from "react-router-dom";
import { FileCheck2 } from "lucide-react";
import { grainCriteria, isCodeGeneralCriteria, weatherCriterion, type BilgeType, type Criterion } from "@/lib/calc/stability";
import { ResultTable, ToolNotice, ToolPage, ToolSection, type ResultRow } from "@/components/tools/ToolKit";
import { CriteriaTable } from "@/components/tools/CriteriaTable";
import { fmt, parseNumber } from "@/components/tools/format";
import { GzInputsSection } from "@/components/stability/GzInputs";
import { useGzInputs } from "@/components/stability/useGzInputs";
import { StabilityDisclaimer } from "@/components/stability/StabilityDisclaimer";
import { readStabilityForm, savedLoadingResult } from "@/components/stability/stabilityForms";
import { savedGrain } from "@/components/stability/grainForms";

type Section = { title: string; criteria?: Criterion[]; note?: string; link: string };

/** One report for the condition: IS Code 2.2, 2.3 and Grain Code A 7 where the data has been entered. */
export default function StabilityAnalysisPage() {
  const inputs = useGzInputs();
  const loading = savedLoadingResult();
  const top = inputs.gz.length ? Math.max(...inputs.gz.map((p) => p.angle)) : 0;
  const sections: Section[] = [];

  if (inputs.gz.length > 0 && top >= 40) {
    const thetaF = parseNumber(readStabilityForm("gz-imo", { downflooding: "" }).downflooding);
    sections.push({
      title: "IS Code 2008 Part A 2.2",
      criteria: isCodeGeneralCriteria(inputs.gz, inputs.gmFluid, thetaF > 0 ? thetaF : undefined).criteria,
      link: "/stability/gz-imo",
    });

    const w = readStabilityForm("weather", {} as Record<string, string>);
    const num = (k: string) => parseNumber(w[k]);
    const bilge = (w.bilge as BilgeType) ?? "bilge-keels";
    if (["windArea", "windLever", "breadth", "meanDraft", "lwl", "cb"].every((k) => num(k) > 0) && top >= 50) {
      try {
        const r = weatherCriterion({
          gz: inputs.gz,
          displacement: inputs.displacement,
          windArea: num("windArea"),
          windLever: num("windLever"),
          breadth: num("breadth"),
          meanDraft: num("meanDraft"),
          lwl: num("lwl"),
          blockCoefficient: num("cb"),
          kg: inputs.kgFluid,
          gmFluid: inputs.gmFluid,
          bilge,
          bilgeKeelArea: num("bilgeKeelArea"),
          downfloodingAngle: num("downflooding") > 0 ? num("downflooding") : undefined,
          deckEdgeAngle: num("deckEdge") > 0 ? num("deckEdge") : undefined,
          rollingPeriod: num("rollingPeriod") > 0 ? num("rollingPeriod") : undefined,
        });
        sections.push({ title: "IS Code 2008 Part A 2.3 (weather)", criteria: r.criteria, link: "/stability/wind-weather" });
      } catch (e) {
        sections.push({ title: "IS Code 2008 Part A 2.3 (weather)", note: e instanceof Error ? e.message : "Could not be evaluated.", link: "/stability/wind-weather" });
      }
    } else {
      sections.push({ title: "IS Code 2008 Part A 2.3 (weather)", note: "Wind and roll data not entered yet.", link: "/stability/wind-weather" });
    }

    const grain = savedGrain();
    if (grain) {
      const g = readStabilityForm("grain-criteria", {} as Record<string, string>);
      const thetaFg = parseNumber(g.downflooding);
      const deck = parseNumber(g.deckEdge);
      try {
        const r = grainCriteria({
          gz: inputs.gz,
          displacement: inputs.displacement,
          gmFluid: inputs.gmFluid,
          volumetricMoment: grain.volumetric,
          stowageFactor: grain.stowageFactor,
          downfloodingAngle: thetaFg > 0 ? thetaFg : undefined,
          deckEdgeAngle: deck > 0 ? deck : undefined,
        });
        sections.push({ title: "Grain Code A 7", criteria: r.criteria, link: "/stability/grain-calculation" });
      } catch (e) {
        sections.push({ title: "Grain Code A 7", note: e instanceof Error ? e.message : "Could not be evaluated.", link: "/stability/grain-calculation" });
      }
    }
  }

  const summary: ResultRow[] = [
    { label: "Displacement", value: Number.isFinite(inputs.displacement) ? `${fmt(inputs.displacement, 1)} t` : "—" },
    { label: "KG fluid", value: Number.isFinite(inputs.kgFluid) ? `${fmt(inputs.kgFluid, 3)} m` : "—" },
    { label: "GM fluid", value: Number.isFinite(inputs.gmFluid) ? `${fmt(inputs.gmFluid, 3)} m` : "—", emphasis: true },
    ...(loading?.trim ? [{ label: "Drafts F / A", value: `${fmt(loading.trim.forward, 2)} / ${fmt(loading.trim.aft, 2)} m` }] : []),
  ];
  const reportText = [
    "Stability condition report",
    ...summary.map((r) => `${r.label}: ${r.value}`),
    ...sections.flatMap((s) => [`— ${s.title}`, ...(s.criteria ?? []).map((c) => `${c.label}: ${c.actual} (${c.required}) ${c.pass ? "PASS" : "FAIL"}`), ...(s.note ? [s.note] : [])]),
  ].join("\n");

  return (
    <ToolPage title="Stability Condition Report" icon={FileCheck2}>
      <StabilityDisclaimer />
      <GzInputsSection inputs={inputs} />
      <ToolSection title="Report" icon={FileCheck2} description="Criteria evaluated with the data entered on the individual stability tools.">
        <ResultTable title="Condition" rows={summary} copyText={reportText} />
        {sections.length === 0 && <ToolNotice>Enter KN values to at least 40° to evaluate the criteria.</ToolNotice>}
        {sections.map((s) =>
          s.criteria ? (
            <CriteriaTable key={s.title} title={s.title} criteria={s.criteria} />
          ) : (
            <ToolNotice key={s.title}>
              <p className="font-semibold">{s.title}</p>
              <p>{s.note} <Link to={s.link} className="font-semibold text-primary underline">Open the tool</Link></p>
            </ToolNotice>
          ),
        )}
      </ToolSection>
    </ToolPage>
  );
}
