# Tools section audit — 30 October 2026

## Scope
Code-level audit of the top-level Tools catalog and the four especially misleading survey/tank estimators plus unit conversion. This is **not** certification of all nested calculators, ship-specific calculations or maritime publications.

## Confirmed defects fixed
| Area | Previous behavior | Resolution |
| --- | --- | --- |
| Directory | "Navigation and Navigation" duplicate heading; vague groupings | Navigation, Cargo & Draft Survey, Stability, Marine Engineering, Seamanship and Converters |
| Directory | Ship-system reading, tide tutorial and formula reference cards shown as calculators | Removed from Tools (their existing app routes remain available elsewhere) |
| Directory | Quick tools duplicated separate favorites/recents UI; recent list stale until remount | Shared tool card with live recent state and favorites tracking |
| Directory | Unknown saved tool IDs could reappear after legacy migrations | Legacy ID remapping, validation and deduplication |
| Converter | "km/s" label for a km/h factor | Correct label and exact SI factor |
| Converter | Swapping unit selectors changed the physical measurement | Converted result carried into the source input when swapping |
| Converter | parseFloat accepted malformed strings; precision factors truncated | Strict numeric parsing, high-precision SI factors and error feedback |
| Tank | Calculated "moment" as volume × height/2, then displayed t·m | Now mass × height/2 (t·m), explicitly relative to tank bottom |
| Tank | Named "Sounding Table" without a calibration/sounding table | Renamed rectangular tank estimate; actual sounding tables required |
| Density | Vague displacement reference and unchanged stale result after input edits | Explicit reference-table mass and actual-density result; validated inputs |
| Ballast | Draft × TPC difference presented as ballast weight regardless of other changes | Explicit approximate displacement change, not ballast weight |
| Bunker | Draft × TPC assumed equal to delivered bunker mass, and universal 0.0006/°C factor | Use actual net tank volume, reference density and **table-supplied VCF**; no unsupported universal factor |

## Engineering assumptions and constraints
- Draft difference uses an approximate Simpson-style forward/midship/aft mean and a constant TPC. It cannot isolate the cause of draft changes and does not account for changes in TPC, trim/list, water density, hog/sag or other onboard weights.
- Rectangular-tank moment is only valid for a vertical constant-area prism with uniform density, taking the tank bottom as datum. It does not account for actual tank geometry/free-surface or reference to ship's keel.
- Density conversion holds submerged volume constant. It assumes the hydrostatic reference displacement and actual density are stated correctly.
- Bunker quantity is estimated from **net observed fuel volume**, a provided VCF from applicable petroleum tables, and certified density at 15 °C. The tool does not derive tank volumes or VCF; real surveys need proper sounding tables, trim/list and free-water corrections.

## Verification
- `npm run test:tools` runs numerical test vectors and checks that every catalog route has an App route.
- `npm run typecheck` and `npm run build` are configured in the dedicated PR workflow.
- Final acceptance requires passing CI and a device/browser UI review, particularly iOS safe areas and decimal keyboards.

## Follow-on audit
The mathematical implementations inside the Navigation, Stability, Machine/Engineering and Cargo calculation collections were **not individually verified** in this changeset. They require formula-by-formula reference checking, realistic boundary conditions and ship-data examples before any claims of full accuracy.
