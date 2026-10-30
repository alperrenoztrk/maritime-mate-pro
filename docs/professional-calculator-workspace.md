# Professional calculator workspace (30 October 2026)

## Implemented
- Shared mobile-first calculator panels, two-column-at-tablet field grids, controlled decimal inputs, per-field validation and units.
- Always-explicit calculation action, reset action, stale-results invalidation when any input changes, copyable UTC calculation record with inputs/formula/results/working.
- Expandable deterministic solution steps and visible training/ship-specific data limitations.
- Dedicated true-motion CPA/TCPA screen (`/navigation/calc/cpa`), with true bearing (not bow-relative) and **COG/SOG** inputs.
- Reuses the existing `computeArpaCpaTcpa` engine instead of introducing a second CPA formula.
- Explicit treatment of diverging contacts (past TCPA clamped to zero) and negligible relative velocity (undefined TCPA).
- Shared workspace on Bunker Estimate, Displacement Density Correction, Draft Change Estimate, Rectangular Tank Estimate.
- Shared input/panel visuals on `CalculatorCard` used by standard course calculators while retaining the existing result audit and optional AI explanation.
- Direct CPA entry in Tools.

## Validation
- `npm run test:professional-calculators`: numeric-field parser, reproducible records and CPA motion scenarios.
- Existing `npm run test:tools`, `npm run typecheck` and `npm run build` are run in the `Tools calculation quality` GitHub Actions workflow.
- Manually check iPhone/Android decimal keyboard, small-screen overflow, screen-reader labels, copy failures, and dark/light themes before release.

## Scope of reliability
- No algorithmic audit of the complete Navigation/Engineering/Stability formula catalogs is implied.
- CPA and TCPA are idealised constant-velocity results, not a COLREG determination or an ARPA approval.
- Where relative speed is effectively zero, TCPA is undefined rather than a fabricated zero-minute future closest approach.
- Bunker density/VCF and vessel hydrostatic/sounding inputs must originate in applicable approved sources.
- Copied reports are clearly labelled training and cross-check data.

## Future migration
Use the shared `CalculatorPanel`, `CalculatorNumberField` and `CalculatorResultPanel` for advanced calculator pages after verifying each formula and input contract. Do not move advanced ship-specific calculators into this common engine without separate validation.
