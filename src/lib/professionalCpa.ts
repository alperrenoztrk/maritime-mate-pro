import { computeArpaCpaTcpa } from "@/components/calculations/navigationMath";
import type { ProfessionalOutput } from "@/components/calculations/ProfessionalCalculator";

/**
 * A reproducible CPA/TCPA worksheet with a time convention matching the engine:
 * historical/negative TCPA is clamped to now; constant relative velocity.
 * Bearing is TRUE, clockwise from north; courses and speeds are COG/SOG.
 */
export function solveProfessionalCpa(values: Record<string, number>): ProfessionalOutput {
  const { ownCourse, ownSpeed, targetCourse, targetSpeed, bearing, range } = values;
  const result = computeArpaCpaTcpa({
    targetBearingDeg: bearing,
    targetDistanceNm: range,
    targetCourseDeg: targetCourse,
    targetSpeedKn: targetSpeed,
    ownCourseDeg: ownCourse,
    ownSpeedKn: ownSpeed,
  });
  const rad = (degrees: number) => degrees * Math.PI / 180;
  const rx = range * Math.sin(rad(bearing));
  const ry = range * Math.cos(rad(bearing));
  const vx = targetSpeed * Math.sin(rad(targetCourse)) - ownSpeed * Math.sin(rad(ownCourse));
  const vy = targetSpeed * Math.cos(rad(targetCourse)) - ownSpeed * Math.cos(rad(ownCourse));
  const speedSquared = vx * vx + vy * vy;
  const stationary = speedSquared < 1e-9;
  const unconstrainedHours = stationary ? null : -(rx * vx + ry * vy) / speedSquared;
  const receding = unconstrainedHours !== null && unconstrainedHours < 0;
  const notices = [
    "Constant COG/SOG vectors on a locally flat chart; no allowance for alterations, set/drift changes or measurement uncertainty.",
    "CPA alone does not establish whether a risk of collision exists. Apply COLREG Rule 7 and maintain a proper lookout and radar/ARPA assessment.",
  ];
  if (stationary) notices.unshift("Relative speed is effectively zero; no unique time of closest approach exists.");
  else if (receding) notices.unshift("Closest approach was in the past: shown CPA is the present range and TCPA is set to zero.");
  if (range === 0) notices.unshift("The vessels are co-located at this instant (input range 0 NM).");

  return {
    results: [
      { label: "Closest point of approach (CPA)", value: `${result.cpaNm.toFixed(3)} NM`, primary: true },
      { label: "Time to CPA (TCPA)", value: stationary ? "Undefined (zero relative speed)" : `${result.tcpaMin.toFixed(1)} min`, primary: true },
      { label: "Relative speed", value: `${result.relativeSpeedKn.toFixed(2)} kn` },
      { label: "Relative motion direction (true)", value: stationary ? "Undefined" : `${result.relativeBearingDeg.toFixed(1)}°T` },
    ],
    steps: [
      `Relative position: East = ${rx.toFixed(4)} NM, North = ${ry.toFixed(4)} NM (range × sin/cos true bearing).`,
      `Relative velocity (target minus own): East = ${vx.toFixed(4)} kn, North = ${vy.toFixed(4)} kn.`,
      stationary ? "Relative velocity squared is ~0; future TCPA cannot be determined." :
        `Unclamped tCPA = −(R·Vrel)/|Vrel|² = ${(unconstrainedHours! * 60).toFixed(2)} min; operational display uses max(0, tCPA).`,
      `CPA = |R + Vrel × tCPA| = ${result.cpaNm.toFixed(4)} NM.`,
    ],
    notices,
  };
}
