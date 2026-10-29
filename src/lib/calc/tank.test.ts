import test from "node:test";
import assert from "node:assert/strict";
import { circularSegmentArea, tankCapacity, tankFsm, tankVolumeAtDepth } from "./tank";

const near = (a: number, e: number, tol: number, what: string) => assert.ok(Math.abs(a - e) <= tol, `${what}: expected ${e}, got ${a}`);

test("circular segment", () => {
  // Half full: πr²/2; full: πr²
  near(circularSegmentArea(1, 1), Math.PI / 2, 1e-12, "half");
  near(circularSegmentArea(1, 2), Math.PI, 1e-12, "full");
  near(circularSegmentArea(1, 0), 0, 1e-12, "empty");
  // r = 1, h = 0.5: acos(0.5) − 0.5·√0.75 = 1.047198 − 0.433013 = 0.614185
  near(circularSegmentArea(1, 0.5), 0.614185, 1e-6, "quarter depth");
});

test("tank volumes and capacity", () => {
  assert.equal(tankVolumeAtDepth({ shape: "rectangular", length: 10, breadth: 8, height: 5 }, 2.5), 200);
  assert.equal(tankVolumeAtDepth({ shape: "rectangular", length: 10, breadth: 8, height: 5 }, 9), 400);
  near(tankCapacity({ shape: "vertical-cylinder", diameter: 4, height: 6 }), Math.PI * 4 * 6, 1e-12, "vertical cylinder");
  near(tankVolumeAtDepth({ shape: "horizontal-cylinder", diameter: 2, length: 10 }, 0.5), 6.14185, 1e-5, "horizontal cylinder");
});

test("free surface moments", () => {
  // Rectangular: 1.025 × 10 × 8³ / 12 = 437.33
  near(tankFsm({ shape: "rectangular", length: 10, breadth: 8, height: 5 }, 2, 1.025), 437.333333, 1e-6, "rectangular");
  // Vertical cylinder: ρ π d⁴ / 64 = 1.0 × π × 256 / 64 = 4π
  near(tankFsm({ shape: "vertical-cylinder", diameter: 4, height: 6 }, 3, 1.0), 4 * Math.PI, 1e-12, "vertical cylinder");
  // Horizontal cylinder half full: free surface breadth = d = 2 → 1 × 10 × 8 / 12
  near(tankFsm({ shape: "horizontal-cylinder", diameter: 2, length: 10 }, 1, 1.0), 80 / 12, 1e-12, "horizontal cylinder");
});
