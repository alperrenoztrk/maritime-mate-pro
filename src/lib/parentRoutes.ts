/**
 * Single source of truth for "logical parent" routes used by the standard
 * BackButton across the entire app.
 *
 * Rule: every page's back button jumps to its logical parent, NEVER to
 * `navigate(-1)` or `history.back()`. This guarantees a predictable
 * single-tap return regardless of how the user arrived at the page.
 *
 * Reference implementation: `src/pages/ShipOperationsDetail.tsx`.
 */

export const PARENT_ROUTES = {
  // Top-level hubs
  home: "/",
  calculations: "/calculations",
  lessons: "/lessons",
  crew: "/crew",
  shipSystems: "/ship-systems",
  shipOperations: "/ship-operations",
  shipTasks: "/ship-tasks",
  bridge: "/bridge",
  beta: "/beta",

  // Stability hub
  stabilityHub: "/stability/practical",
  stabilityCalculations: "/stability/calculations",
  stabilityFormulas: "/stability/formulas",

  // Cargo / Draft survey
  cargoCalculations: "/cargo/calculations",
  cargo: "/cargo/calculations",

  // Environment / Emissions
  environment: "/environment/calculations",

  // Meteorology
  meteorology: "/meteorology/topics",

  // Machinery / Engine
  machinery: "/machinery",
  engine: "/engine",

  // SOLAS
  solas: "/solas/regulations",
} as const;

export type ParentRouteKey = keyof typeof PARENT_ROUTES;
