import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const expected = [
  "RegulationPagedReaderPage", "LessonTopicDetailPage", "MachineTopicDetailPage",
  "StabilityTopicsPage", "CargoTopicsPage", "SafetyTopicsPage",
  "SeamanshipTopicsPage", "EnvironmentTopicsPage", "EconomicsTopicsPage",
  "FluidMechanicsTopicsPage", "DetailedMeteorology",
  "BridgeDeviceDetail", "ShipTaskDetailPage", "CrewRoleDetail",
  "CrewTaskDeepDive", "ShipOperationDeepDive", "ShipSystemDeepDive",
  "StabilityFormulaDetail", "SOLASRegulations", "SOLASCertificates",
  "SOLASShipRequirements", "SOLASSafetyEquipment",
];
for (const module of expected) {
  const source = readFileSync(`src/pages/${module}.tsx`, "utf8");
  assert.match(source, /PagedReadingSurface|LegacyTopicBook/, `${module} must use the common page reader`);
  assert.match(source, /storageKey=/, `${module} must persist a reading position`);
}
const regulationDetail = readFileSync("src/App.tsx","utf8");
assert.match(regulationDetail, /path="\/regulations\/:slug\/reference"/,
  "Long-form full legislation reference must remain accessible");
assert.match(regulationDetail, /path="\/regulations\/:slug"/,
  "Paged legislation must remain the default");
console.log(`Reader integration validated for ${expected.length} teaching pages and legislation fallback routes.`);
