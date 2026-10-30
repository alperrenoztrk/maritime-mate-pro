# Tools professional-calculator quality audit — stage 2

Date: 2026-10-31. Scope: Navigation, Stability, Marine Engineering.

## Verified standalone calculations

The eight entries below use the common calculator workspace (typed numeric inputs, result snapshots, deterministic working, UTC copy, limitations and clearances) and are linked from Tools:

| Tools route slug | Mathematical contract | Critical caveat |
| --- | --- | --- |
| voyage-eta | Distance / constant SOG; departure UTC plus whole-day rollover | No calendar date, variable speed or time-zone forecast |
| static-ukc | Charted depth + tide − effective draft − squat − other allowances | Never supplies an acceptable UKC criterion; chart datum must match |
| free-surface | Rectangular slack tank i = L·B³/12; FSC = ρ·i/Δ; corrected GM | Single rectangular tank, initial GM only |
| transverse-weight-shift | Signed transverse GG₁ = w·d/Δ; heel ≈ atan(GG₁/GM) | Initial small-angle approximation; no approval |
| waterplane-tpc | Waterplane area × actual density / 100 | Area at the actual draft must come from vessel data |
| engine-sfoc | kW × g/kWh × operating hours / 10⁶ = tonnes | Assumed average operating point |
| fuel-endurance | (ROB − protected reserve) / tonnes per day | Excludes unpumpable fuel and variable loads unless inputs reflect them |
| counterflow-lmtd | Positive terminal temperature differences and log mean | Steady counterflow; no correction factor for complex arrangements |

## Legacy-calculator hardening

- 86 machinery calculators in 16 legacy topic groups now share professional panel and numeric field UI instead of falling back to missing input = 0.
- Individual calculator entries reject incomplete numbers, invalid results and nonfinite outputs, clear stale results on edits, and expose limits/assumptions in a calculation record.
- Course-linked Navigation ETA now calls the same verified time kernel and preserves D+N.
- Carnot absolute-temperature domain, counterflow LMTD, exchanger positive denominators, Diesel and Otto cycle domains validated.
- Legacy hydrostatics 'angle of loll = arccos(KG/KM)' removed: KG/KM alone do not establish equilibrium loll.
- Demo stability GM/IMO and grain messages no longer assert vessel safety or full regulatory approval from insufficient input data.
- Engine CO₂ and SOx g/kWh conversions fixed to include actual mass flow; fouling resistance adds to 1/U (rather than subtracting); specific-rate and exchanger functions extracted to independently tested pure code.
- Modelled NOx rates, sulfur percentages, assumed SOG and guessed formulas can **not** prove EIAPP, ECA, IMO CII, or EEOI compliance; UI now says 'not assessed'.

## Regression contract

`npm run test:verified-operational`: numerical vectors including ETA day rollover, signed depths, negative UKC, unstable GM, weight shift, hot/cold terminal equal-difference limit, heat-exchanger area growth from fouling, emissions conversion, SFOC and protected-reserve endurance.

`npm run test:tools`, `npm run test:professional-calculators`, `npm run typecheck`, `npm run build` are required with the new tests.

## Limitations

- This is not independent numerical verification of every formula in all 86 legacy machinery calculators, and it does not imply Class, IMO or flag approval.
- The legacy 86 have a common input/output safety barrier, but only selected scientific formulas have been independently checked.
- For all practical shipboard operations, the vessel's approved loading instrument, hydrostatics, stability booklet, sounding tables, SMS, radar/ARPA equipment, manufacturer technical files and navigational publications take precedence.
