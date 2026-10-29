import { Navigate, useParams } from "react-router-dom";
import { Sigma } from "lucide-react";
import { stability } from "@/data/courseContent/stability";
import { CalculatorCard } from "@/components/courseContent/CalculatorCard";
import { FormulaList } from "@/components/courseContent/FormulaList";
import { ToolPage } from "@/components/tools/ToolKit";

/** Old formula-guide addresses → the matching course entry, or the tool that replaced them. */
const LEGACY: Record<string, string> = {
  "moment-kg": "new-kg-loading",
  "gm-shifting": "gm-shift",
  "meyil-acisi": "list-shift",
  "kreyn-gm": "crane-gm",
  "havuzlama-gm": "dock-reaction",
  "trim-degisimi": "trim-change",
  "paralel-batma": "parallel-sinkage",
  "draft-duzeltme": "trim-distribution",
  "yogunluk-duzeltmesi": "density-correction",
  "blok-katsayisi": "block-coeff",
  "fwa-yogunluk": "fwa",
  "kumelenme-acisi": "grain-heel",
  "simpson-alan": "simpson-area",
  "yalpa-periyodu": "roll-period",
  "yarali-stabilite": "flooding-rate",
};

const LEGACY_PAGES: Record<string, string> = {
  giris: "/cargo/formulas",
  "trim-duzeltmeleri": "/cargo/formulas",
  "duba-tank-hacim": "/stability/practical/tank",
  "musade-yuk": "/lessons/cargo/formulas",
  "sicaklik-yogunluk": "/cargo/calculations/bunker",
};

export default function StabilityFormulaDetailPage() {
  const { id = "" } = useParams();
  if (LEGACY_PAGES[id]) return <Navigate to={LEGACY_PAGES[id]} replace />;
  const entry = stability.entries.find((e) => e.id === (LEGACY[id] ?? id));
  if (!entry) return <Navigate to="/stability/formulas" replace />;
  return (
    <ToolPage title={entry.name} icon={Sigma}>
      <FormulaList entries={[entry]} />
      {entry.calculate && <CalculatorCard entry={entry} />}
    </ToolPage>
  );
}
