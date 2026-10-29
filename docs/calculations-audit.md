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
