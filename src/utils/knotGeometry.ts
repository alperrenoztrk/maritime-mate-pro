// Pure knot path geometry — shared by the 3D viewer (Knot3DViewer) and the
// lightweight 2D step-by-step lesson animation (KnotTyingAnimation).
//
// Each builder returns an ordered list of points that traces the rope along its
// tying path (from the standing end to the working/tail end). Returning plain
// {x,y,z} objects keeps this module free of any three.js dependency so it can be
// imported from the data/UI layers without pulling in WebGL.

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

// ---------------------------------------------------------------------------
// Knots that also drive the 3D viewer (full over/under encoded in z)
// ---------------------------------------------------------------------------

export function buildBowlinePoints(): Vec3[] {
  // Bowline tying path: standing part, form the loop ("rabbit hole"),
  // working end up through the loop, around the standing part, back down.
  const pts: Vec3[] = [];
  // Standing part, slight sag
  for (let x = -6; x <= -2; x += 0.4) pts.push({ x, y: -0.1 + 0.06 * Math.sin((x + 6) * 0.5), z: 0 });
  // Form the small loop (the "rabbit hole")
  for (let t = 0; t <= Math.PI * 1.1; t += Math.PI / 22) {
    const r = 2.7;
    const cx = -1.8;
    const cy = 1.9;
    pts.push({ x: cx + r * Math.cos(t), y: cy + r * Math.sin(t), z: t < Math.PI * 0.55 ? 0.18 : -0.18 });
  }
  // Working end comes up through the loop
  for (let s = 0; s <= 1; s += 1 / 18) {
    pts.push({ x: -2 + s * 2.0, y: 0.1 + s * 2.2, z: s < 0.5 ? -0.2 : 0.2 });
  }
  // Circle around the standing part
  for (let t = -Math.PI * 0.1; t <= Math.PI * 1.1; t += Math.PI / 24) {
    const r = 2.9;
    const cx = 0.1;
    const cy = 1.3;
    pts.push({ x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) * 0.9, z: t < Math.PI * 0.6 ? 0.2 : -0.2 });
  }
  // Back down through the loop and exit as tail
  for (let s = 0; s <= 1; s += 1 / 16) {
    pts.push({ x: 0.8 + s * 2.6, y: 0.5 - s * 1.0, z: s < 0.5 ? -0.18 : 0.18 });
  }
  for (let x = 3.4; x <= 7.0; x += 0.35) pts.push({ x, y: -0.4, z: 0 });
  return pts;
}

export function buildFigureEightPoints(): Vec3[] {
  // Figure-of-eight stopper: two loops with slight over/under crossings.
  const pts: Vec3[] = [];
  // Left loop centered at (-2, 0)
  const lcx = -2, lcy = 0, lr = 2.4;
  for (let t = Math.PI * 0.1; t <= Math.PI * 2.1; t += Math.PI / 28) {
    pts.push({ x: lcx + lr * Math.cos(t), y: lcy + lr * Math.sin(t) * 0.8, z: t < Math.PI ? 0.14 : -0.14 });
  }
  // Transition across the center (cross over/under)
  for (let s = 0; s <= 1; s += 0.1) {
    pts.push({ x: -0.5 + s * 1.0, y: 0.2 - s * 0.4, z: s < 0.5 ? -0.16 : 0.16 });
  }
  // Right loop centered at (2, 0)
  const rcx = 2, rcy = 0, rr = 2.4;
  for (let t = Math.PI * 1.1; t <= Math.PI * 3.1; t += Math.PI / 28) {
    pts.push({ x: rcx + rr * Math.cos(t), y: rcy + rr * Math.sin(t) * 0.8, z: t < Math.PI * 2 ? 0.14 : -0.14 });
  }
  // Tail out
  for (let x = 4; x <= 8; x += 0.4) pts.push({ x, y: -0.2, z: 0 });
  return pts;
}

export function buildCloveHitchPoints(): Vec3[] {
  // Clove hitch: two opposing half-hitches wrapped around a post.
  const pts: Vec3[] = [];
  const R = 2.0; // post radius
  // Approach
  for (let x = R + 3.2; x >= R + 0.08; x -= 0.08) pts.push({ x, y: -1.4, z: 0 });
  // First wrap upward, then crossing
  const upH = 1.7;
  const steps1 = 100;
  for (let i = 0; i <= steps1; i++) {
    const t = (i / steps1) * (Math.PI * 2);
    const y = -1.4 + (upH * i) / steps1;
    const zOff = i < steps1 * 0.35 ? 0.14 : -0.14;
    pts.push({ x: Math.cos(t) * (R + 0.02), y, z: Math.sin(t) * (R + 0.02) + zOff });
  }
  // Second wrap downward with phase shift to intersect properly
  const downH = 1.5;
  const steps2 = 100;
  for (let i = 0; i <= steps2; i++) {
    const t = (i / steps2) * (Math.PI * 2) + Math.PI * 0.9;
    const y = 0.3 - (downH * i) / steps2;
    const zOff = i < steps2 * 0.45 ? -0.16 : 0.16;
    pts.push({ x: Math.cos(t) * (R + 0.02), y, z: Math.sin(t) * (R + 0.02) + zOff });
  }
  // Tail exit
  for (let x = R + 0.08; x <= R + 3.8; x += 0.08) pts.push({ x, y: -1.15, z: 0 });
  return pts;
}

// ---------------------------------------------------------------------------
// Additional knots authored as flat 2D traces (z = 0) for the lesson animation.
// Sparse control points; the renderer smooths them into a rope curve.
// ---------------------------------------------------------------------------

const flat = (pts: [number, number][]): Vec3[] => pts.map(([x, y]) => ({ x, y, z: 0 }));

// Reef (square) knot — two interlocking bights of equal rope.
export function buildReefRopeA(): Vec3[] {
  // Bight opening to the right; both ends run off to the left.
  return flat([
    [-7, 1.1], [-1.5, 1.1], [1.2, 1.0], [2.4, 0.5], [2.7, 0], [2.4, -0.5], [1.2, -1.0], [-1.5, -1.1], [-7, -1.1],
  ]);
}
export function buildReefRopeB(): Vec3[] {
  // Bight opening to the left; both ends run off to the right. Threads through A.
  return flat([
    [7, 1.1], [1.5, 1.1], [-1.2, 1.0], [-2.4, 0.5], [-2.7, 0], [-2.4, -0.5], [-1.2, -1.0], [1.5, -1.1], [7, -1.1],
  ]);
}
export function buildReefLockOverlay(): Vec3[] {
  // Rope A's tip redrawn on top so the two bights read as interlocked.
  return flat([[1.4, 0.7], [2.4, 0.45], [2.7, 0], [2.4, -0.45], [1.4, -0.7]]);
}

// Sheet bend — joins two ropes of different diameter.
export function buildSheetBendBight(): Vec3[] {
  // Thicker rope forms a bight, opening to the right.
  return flat([
    [7, 1.2], [0.5, 1.2], [-1.8, 1.0], [-2.8, 0], [-1.8, -1.0], [0.5, -1.2], [7, -1.2],
  ]);
}
export function buildSheetBendWorking(): Vec3[] {
  // Thinner rope: up through the bight, around the back of both legs, tuck under itself.
  return flat([
    [-7, -1.6], [-3.6, -1.2], [-2.6, -0.4], [-2.4, 0.9], [-1.4, 1.3], [-0.4, 1.0], [-0.6, -0.4], [-1.6, -1.0], [-3.4, -0.6],
  ]);
}

// Round turn and two half hitches — secures a line to a ring/post.
export function buildRoundTurnTwoHalfHitches(): Vec3[] {
  const pts: Vec3[] = [];
  const cx = -4, r = 0.95;
  // Standing part approaches from the right
  pts.push({ x: 7, y: 0.25, z: 0 }, { x: -2.6, y: 0.2, z: 0 });
  // Round turn: two full wraps around the post (z gives the over/under depth)
  for (let turn = 0; turn < 2; turn++) {
    const yShift = turn * 0.35;
    for (let i = 0; i <= 16; i++) {
      const t = (i / 16) * Math.PI * 2;
      const zOff = i < 5 || i > 12 ? 0.18 : -0.18;
      pts.push({ x: cx + Math.cos(t) * r, y: Math.sin(t) * r + yShift, z: Math.sin(t) * r * 0.4 + zOff });
    }
  }
  // Run back along the standing part toward the hitches
  pts.push({ x: -1.4, y: 0.1, z: 0 });
  // First half hitch around the standing part
  pts.push({ x: -1.0, y: 0.7, z: 0.18 }, { x: -1.5, y: 0.95, z: -0.18 }, { x: -1.7, y: 0.2, z: 0.18 }, { x: -0.9, y: 0, z: 0 });
  // Second half hitch
  pts.push({ x: 0.1, y: 0.7, z: 0.18 }, { x: -0.4, y: 0.95, z: -0.18 }, { x: -0.6, y: 0.2, z: 0.18 }, { x: 0.3, y: 0, z: 0 });
  // Tail
  pts.push({ x: 1.3, y: -0.4, z: 0 });
  return pts;
}
