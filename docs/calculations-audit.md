# Calculations audit (Tools)

Every calculator in the Tools tab is listed with its formula, source and status.
Rule: a figure may be missing, but it must never be wrong — a calculation that
cannot be verified against a source, or is not usable on board, is hidden and
the decision is put to the user.

Status: **Correct** (verified, unchanged) · **Fixed** (was wrong, corrected) ·
**Removed** (invented or unusable, taken out) · **Hidden – asked** (waiting for
the user) · **New** (added).

Tests: `npm run test:calc` (`src/lib/calc/*.test.ts`). Expected values are worked
independently from the source formula, never generated from the code under test.

## 1. Draft survey (`/cargo/calculations/*`, `/cargo/formulas`)

Engine: `src/lib/calc/draftSurvey.ts`, `src/lib/calc/petroleum.ts`.
Source: UNECE Code of Uniform Standards and Procedures for the Performance of
Draught Surveys of Coal Cargoes (ECE/ENERGY/19, 1992); ASTM D1250-80 Table 54B/56.

| Calculation | Page | Before | Now | Status | Test |
|---|---|---|---|---|---|
| Mean draft | all survey pages | (F + 4M + A)/6 on observed marks, no perpendicular correction | Port/stbd mean → corrections to FP/AP/amidships over LBM → (F + A + 6M)/8 | Fixed | `draftSurvey.test.ts` |
| Displacement | `/cargo/formulas` (old "Standard Draft Survey") | L × B × T × 0.7 × ρ (fixed block coefficient) | Hydrostatic table, linear interpolation at MMM | Fixed | idem |
| Lightweight | `/cargo/formulas` | Hard-coded 2000 t | Entered from the stability booklet | Fixed | — |
| Displacement from drafts | preloading, intermediate, postdischarge, comparative, ballast, bunker | Mean draft × 100 × TPC (TPC constant from the keel) | Full survey per stage | Fixed | idem |
| First trim correction | — (missing) | — | T × LCF × TPC × 100 / LBP | New | idem |
| Second trim correction | — (missing) | — | 50 × T² × (MTC₊₅₀ − MTC₋₅₀) / LBP | New | idem |
| Density correction | `/cargo/calculations/density` | Δ × (ρ − 1.025)/1.025 | Δ × ρ dock / ρ table (same quantity, table density selectable) | Correct | idem |
| Draft change between densities | `/cargo/calculations/density` | — | Δ(ρ₁ − ρ₂)/(ρ₂ × TPC₁); FWA identity tested | New | idem |
| Deductibles, net displacement, cargo | draft-survey, postdischarge | Partial, stores mixed with deductibles | Ballast, FW, FO, DO, LO, bilges, other; cargo = \|ΔNet\| | Fixed | idem |
| Ship's constant, cargo intake | preloading | "Recommended load = 90 % of available", "stability good/caution" from trim | Constant = Net Δ light − lightship; intake = Δ permitted − lightship − constant − departure deductibles | Removed (invented factors) / New | idem |
| Handling rate, ETC | intermediate | Fixed date 2024-01-01, ΔT × TPC | Two dated surveys, rate = cargo / elapsed time | Fixed | — |
| Outturn vs B/L, ROB | postdischarge | "Discharge efficiency %" | Outturn, difference vs B/L, unaccounted = B/L − outturn − ROB | Removed / New | — |
| Ballast quantity | `/cargo/calculations/ballast` | ΔT × TPC split into fixed holds | Tank volumes × sampled density; draft cross-check | Fixed | — |
| Bunker quantity | `/cargo/calculations/bunker` | ρ × (1 − 0.0006 (t − 15)), ΔT × TPC | Table 54B VCF, V₁₅, weight in air (ρ₁₅ − 0.0011), vs BDN; draft cross-check | Fixed | `petroleum.test.ts` |
| Quick estimate (draft change × TPC) | draft-survey | Presented as the survey | Kept as a labelled rough cross-check | Correct | — |

## 2. Stability (`/stability/*`, Learn → Stability / Cargo calculators)

Engine: `src/lib/calc/stability.ts`, `src/lib/calc/tank.ts`.
Sources: IMO 2008 IS Code (MSC.267(85)) Part A 2.2, 2.3 and tables 2.3.4-1…4
(checked against the MCA MSIS43 reproduction of the Code text; the MCA's
extended X1/s rows are not used); International Grain Code (MSC.23(59)) A 6, A 7,
B 1.3, B 1.5; International Convention on Load Lines 1966 (FWA/DWA).

Removed engine: `src/services/hydrostaticCalculations.ts` and its copy
`src/utils/hydrostaticUtils.ts` (box-hull approximations). Its regression test
compared the class with values generated from the class itself;
`npm run test:validation` (CI) now runs `test:calc` and `test:formulas`.

| Calculation | Page | Before | Now | Status | Test |
|---|---|---|---|---|---|
| GZ at large angles | gz-curve, gz-imo, analysis | GM·sinθ − ½B·sin²θ on a box hull, negative GZ clipped to 0 | KN cross curves: GZ = KN − KG fluid·sinθ − TCG·cosθ | Fixed | `stability.test.ts` |
| Areas under GZ | imo-criteria, gz-imo | Loop took one degree too many; downflooding fixed at 20° | Shape-preserving cubic + Simpson; θf entered | Fixed | idem |
| IS Code 2.2 criteria | imo-criteria, gz-imo, analysis | Partly, with fixed θf | All six criteria, θf rule for 40° areas | Fixed | idem |
| Weather criterion 2.3 | wind-weather | 0.6 × max GZ; wind heel 1000× too small | lw1/lw2, θ0 limit, θ1 with tables X1, X2, k, s, r; areas a and b | Fixed | idem |
| Righting moment | — | Δ·g·GZ/1000 labelled kN·m (was MN·m) | Δ·GZ in t·m | Fixed | — |
| Angle of loll | Learn, gz | arccos(KG/KM) | tan φ = √(2\|GM\|/BM) | Fixed | `courseStability.test.ts` |
| Trim distribution | Learn | Forward and aft distances swapped | ΔTA = t·da/L, ΔTF = t·df/L | Fixed | idem |
| Displacement in fresh water | Learn | Δ·ρsea/ρfresh (inverted) | Δ·ρfresh/ρsea at the same draft | Fixed | idem |
| Rolling period | Learn, toolbox | C·B/√GM with C ≈ 0.7 from Cb | IS Code T = 2CB/√GM, C = 0.373 + 0.023 B/d − 0.043 Lwl/100 | Fixed | idem |
| Loading condition | gm | Box-geometry KM/KB | Weights table → Δ, KG, ΣFSM, GM fluid, list, trim, drafts with booklet KM/LCB/LCF/MCTC | New | `stability.test.ts` |
| Weight shift / load / heavy lift | weight-shift | Partial | GG₁, new KG, heel, trim change, lift from quay or on board | Fixed | idem |
| Free surface | free-surface | Rectangular only | Tank-table FSM or ρlb³/12, ΣFSM/Δ | Correct | idem |
| Grain heeling moment | practical/ghm, grain | Volume × ΔKG × density (not the Code method) | Σ(Mv × 1.00/1.06/1.12)/SF | Fixed | idem |
| Grain criteria A 7 | grain-calculation | "Compliant ≤ 12°" from 57.3·GHM/(Δ·GM) | λ0, λ40 = 0.8λ0, heel ≤ 12° or deck edge, residual area ≥ 0.075, GM ≥ 0.30 | Fixed | idem |
| Grain heel estimate | Learn (stability, cargo) | Shown as "Compliant" | Kept as an estimate, verdict removed | Fixed | — |
| Grain stowage helpers | grain-calculation | TPI/MT1 helpers without unit conversion | Removed; W = V/SF capacity kept | Removed | — |
| Dry-docking | toolbox | Invented "critical GM = 0.05 + block spacing/100", "GM ≥ 1.5 × critical" | P = MCTC·t/l, GM loss P·KM/Δ and P·KG/(Δ−P), largest trim for a minimum GM | Removed / New | idem |
| Pendulum / inclining | toolbox | Error-margin figure | tan θ = deflection/length, GM = w·d/(Δ tan θ) | Fixed | idem |
| Practical tank, FWA | practical/tank, practical/fwa | Showed hogging/sagging content under these titles | Tank volume/mass/FSM (box, cylinders); FWA, DWA, allowed draft | Fixed | `tank.test.ts` |
| Shear force / bending moment | shearing-bending | Hull as a simply supported beam, lightship 30 % of Δ, kN/N mixed | Compares loading-instrument values with permissible (sea/harbour) | Removed / New | — |
| Stability analysis popup | (all stability pages) | Box-geometry "analysis" | Removed; Stability Condition Report uses booklet data | Removed | — |
| 3D model status | calculations | "Normal / Attention / Dangerous" at 5°/15° (invented) | Heel and trim stated without a verdict; "Pier" → Port | Removed | — |

Not yet migrated in this round (shared components, later rounds): `/stability/assistant`
and `/stability/quiz` (AssistantInterface and the quiz component are shared by all modules).

## 3. Cargo, tank and ballast (`/tank`, `/ballast`, `/cargo/assistant`, `/cargo/quiz`)

Engine: `src/lib/calc/tank.ts` (calibration table look-up), `src/lib/calc/ballast.ts`.
Source: BWM Convention 2004 regulations B-4, D-1, D-2 (values checked on the IMO
convention page).

| Calculation | Page | Before | Now | Status | Test |
|---|---|---|---|---|---|
| Tank contents | `/tank` | V = A·h only; "moment" = V·h/2 (m⁴, meaningless) | Calibration table rows → reading corrected for trim/list → volume, weight, VCG, LCG, FSM | Fixed / New | `tank.test.ts` |
| Ballast tank FSM | `/ballast` | Tank length and breadth "estimated" as √(capacity/12) | Removed; FSM comes from the tank tables (Free Surface Effect page) | Removed | — |
| Ballast transfer trim | `/ballast` | Trim = moment / (Δ·GML/100) — LBP missing | δt = −w·Δx/MCTC (cm), heel tan θ = w·Δy/(Δ·GM), pumping time | Fixed | `ballast.test.ts` |
| Exchange (D-1) | `/ballast` | Text only | Sequential / flow-through plan, 3 × volume rule, time; B-4 location check | New | idem |
| D-2 standard | `/ballast` | Text only | Sample values against the five D-2 limits (strict "less than") | New | idem |
| Default tank list | `/ballast` | Six invented tanks with levels and positions | Empty rows for the ship's own tanks | Removed | — |
| AI assistants | all `/…/assistant` pages | Gradient hero, prompts cut at 50 characters | Tool shell, full prompts, caution that AI answers can be wrong | UI | — |
| Quizzes | 8 topic quiz pages | Bare container | Shared `QuizShell`; question banks not audited in this round | UI | — |

## Lesson text: stability book (`src/pages/StabilityTopicsPage.tsx`)

Reviewed with the terminology-reviewer agent (98 findings plus the first list).
Fixed factual errors include: stable/unstable equilibrium stated the wrong way
round (M under/over G); KB described as height of the centre of gravity; KM
called "metacentric height"; trim distribution formula using LCF from the AP for
the forward draft; LCF described as centre of buoyancy; transverse subdivision
said to reduce FSM; "pendulum" GM loss added on top of the virtual rise of G
for suspended weights; icing ΔKG formulas; minimum freeboard attributed to
SOLAS; IS Code area and GZ criteria without the θf rule or the "at ≥ 30°"
condition; weather criterion angles; scope "all ships" (now ≥ 24 m); MSC
circulars for adverse weather; dry-docking critical instant; loll correction
order (now: low-side divided double bottom first). Terms: centre of buoyancy,
angle of heel, capsizing/righting, rolling period, stiff/tender (approved),
inclining experiment, Attained Subdivision Index, area criteria, waterplane.

Removed because the value could not be verified: SOLAS cross-flooding
equalisation time, maximum list after damage, draught-dependent permeability
of cargo spaces (the verified stores/accommodation/machinery/void values kept).
