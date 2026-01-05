import stabilityGolden from "../../data/validation/stability_golden.json";
import maritimeHelpersGolden from "../../data/validation/maritime_helpers_golden.json";
import { HydrostaticCalculations } from "../../services/hydrostaticCalculations";
import type { ShipGeometry } from "../../types/hydrostatic";
import {
  calculateDisplacement,
  calculateGM,
  calculateGZ,
  calculateGreatCircleDistance,
  calculateMTC,
  calculateTPC,
  calculateTrim,
} from "../maritimeHelpers";

const failures: string[] = [];

const withinTolerance = (actual: number, expected: number, tolerance: number, label: string) => {
  if (Math.abs(actual - expected) > tolerance) {
    failures.push(`${label}: expected ${expected} ± ${tolerance}, got ${actual}`);
  }
};

const scenarios = stabilityGolden.scenarios;
if (scenarios.length < 5 || scenarios.length > 10) {
  failures.push(`Scenario count ${scenarios.length} is outside 5–10 range`);
}

for (const scenario of scenarios) {
  switch (scenario.kind) {
    case "gm_gz": {
      const geometry = scenario.inputs.geometry as ShipGeometry;
      const kg = scenario.inputs.kg as number;
      const angle = scenario.inputs.angleDeg as number;
      const stability = HydrostaticCalculations.calculateStabilityData(geometry, kg);
      const angleIndex = stability.angles.indexOf(angle);
      const gz = angleIndex >= 0 ? stability.gz[angleIndex] : 0;
      withinTolerance(stability.gm, scenario.expected.gm as number, scenario.tolerance.gm as number, `${scenario.id}.gm`);
      withinTolerance(gz, scenario.expected.gz as number, scenario.tolerance.gz as number, `${scenario.id}.gz`);
      withinTolerance(stability.maxGz, scenario.expected.maxGz as number, scenario.tolerance.maxGz as number, `${scenario.id}.maxGz`);
      withinTolerance(stability.maxGzAngle, scenario.expected.maxGzAngle as number, scenario.tolerance.maxGzAngle as number, `${scenario.id}.maxGzAngle`);
      withinTolerance(stability.vanishingAngle, scenario.expected.vanishingAngle as number, scenario.tolerance.vanishingAngle as number, `${scenario.id}.vanishingAngle`);
      break;
    }
    case "fsm": {
      const fsm = HydrostaticCalculations.calculateFSMRectangularTank(
        scenario.inputs.length as number,
        scenario.inputs.breadth as number,
        scenario.inputs.rho as number
      );
      const deltaKg = HydrostaticCalculations.calculateDeltaKGFromFSM(
        fsm,
        scenario.inputs.displacement as number
      );
      withinTolerance(fsm, scenario.expected.fsm as number, scenario.tolerance.fsm as number, `${scenario.id}.fsm`);
      withinTolerance(deltaKg, scenario.expected.deltaKg as number, scenario.tolerance.deltaKg as number, `${scenario.id}.deltaKg`);
      break;
    }
    case "imo": {
      const geometry = scenario.inputs.geometry as ShipGeometry;
      const kg = scenario.inputs.kg as number;
      const stability = HydrostaticCalculations.calculateStabilityData(geometry, kg);
      const criteria = HydrostaticCalculations.calculateIMOStabilityCriteria(stability);
      withinTolerance(criteria.area0to30, scenario.expected.area0to30 as number, scenario.tolerance.area0to30 as number, `${scenario.id}.area0to30`);
      withinTolerance(criteria.area0to40, scenario.expected.area0to40 as number, scenario.tolerance.area0to40 as number, `${scenario.id}.area0to40`);
      withinTolerance(criteria.area30to40, scenario.expected.area30to40 as number, scenario.tolerance.area30to40 as number, `${scenario.id}.area30to40`);
      withinTolerance(criteria.maxGz, scenario.expected.maxGz as number, scenario.tolerance.maxGz as number, `${scenario.id}.maxGz`);
      withinTolerance(criteria.initialGM, scenario.expected.initialGM as number, scenario.tolerance.initialGM as number, `${scenario.id}.initialGM`);
      withinTolerance(criteria.weatherCriterion, scenario.expected.weatherCriterion as number, scenario.tolerance.weatherCriterion as number, `${scenario.id}.weatherCriterion`);
      if (criteria.compliance !== scenario.expected.compliance) {
        failures.push(`${scenario.id}.compliance: expected ${scenario.expected.compliance}, got ${criteria.compliance}`);
      }
      break;
    }
    case "gz_from_kn": {
      const gz = HydrostaticCalculations.calculateGZFromKN(
        scenario.inputs.kn as number,
        scenario.inputs.kg as number,
        scenario.inputs.angleDeg as number
      );
      withinTolerance(gz, scenario.expected.gz as number, scenario.tolerance.gz as number, `${scenario.id}.gz`);
      break;
    }
    default:
      failures.push(`Unknown scenario kind: ${scenario.kind}`);
  }
}

for (const scenario of maritimeHelpersGolden.scenarios) {
  switch (scenario.kind) {
    case "gm": {
      const gm = calculateGM(scenario.inputs.km as number, scenario.inputs.kg as number);
      withinTolerance(gm, scenario.expected.gm as number, scenario.tolerance.gm as number, `${scenario.id}.gm`);
      break;
    }
    case "gz": {
      const gz = calculateGZ(scenario.inputs.gm as number, scenario.inputs.angleDeg as number);
      withinTolerance(gz, scenario.expected.gz as number, scenario.tolerance.gz as number, `${scenario.id}.gz`);
      break;
    }
    case "tpc": {
      const tpc = calculateTPC(scenario.inputs.waterplaneArea as number, scenario.inputs.density as number);
      withinTolerance(tpc, scenario.expected.tpc as number, scenario.tolerance.tpc as number, `${scenario.id}.tpc`);
      break;
    }
    case "mtc": {
      const mtc = calculateMTC(
        scenario.inputs.displacement as number,
        scenario.inputs.gml as number,
        scenario.inputs.length as number
      );
      withinTolerance(mtc, scenario.expected.mtc as number, scenario.tolerance.mtc as number, `${scenario.id}.mtc`);
      break;
    }
    case "displacement": {
      const displacement = calculateDisplacement(
        scenario.inputs.length as number,
        scenario.inputs.breadth as number,
        scenario.inputs.draft as number,
        scenario.inputs.cb as number,
        scenario.inputs.density as number
      );
      withinTolerance(
        displacement,
        scenario.expected.displacement as number,
        scenario.tolerance.displacement as number,
        `${scenario.id}.displacement`
      );
      break;
    }
    case "great_circle": {
      const distance = calculateGreatCircleDistance(
        scenario.inputs.lat1 as number,
        scenario.inputs.lon1 as number,
        scenario.inputs.lat2 as number,
        scenario.inputs.lon2 as number
      );
      withinTolerance(
        distance,
        scenario.expected.distanceNm as number,
        scenario.tolerance.distanceNm as number,
        `${scenario.id}.distanceNm`
      );
      break;
    }
    case "trim": {
      const trim = calculateTrim(scenario.inputs.aftDraft as number, scenario.inputs.fwdDraft as number);
      withinTolerance(trim, scenario.expected.trim as number, scenario.tolerance.trim as number, `${scenario.id}.trim`);
      break;
    }
    default:
      failures.push(`Unknown maritime helper scenario kind: ${scenario.kind}`);
  }
}

if (failures.length) {
  const message = ["Validation failures:", ...failures.map((failure) => `- ${failure}`)].join("\n");
  throw new Error(message);
}
console.log("Validation scenarios passed.");
