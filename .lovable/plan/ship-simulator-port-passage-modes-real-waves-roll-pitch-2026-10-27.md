# Ship Simulator: Port / Passage modes, real waves, roll + pitch

## Goal
Turn the Beta 3D Ship Simulator into a sea-keeping simulator: choose **Harbour** or **At Sea (Passage)**, set sea state, and watch the ship roll (port-starboard) and pitch (bow-stern) physically in response to real waves.

## What the user will see
1. **Mode selector** at top: `Harbour` | `Passage`.
   - Harbour: calm water, quay wall with bollards and fenders, breakwater, light swell, ship at low speed / alongside.
   - Passage: open sea, horizon, swell, ship underway.
2. **Sea controls** (Passage): Sea state (Douglas 0-6), wave heading relative to ship (head / bow / beam / quarter / following), ship speed (kn).
3. **Motion**: ship heaves, rolls and pitches with the waves the user sees; beam seas = large roll, head seas = pitch and slamming spray, quartering = combined.
4. **Live readout**: roll angle, pitch angle, roll period, pitch period, encounter period, and a warning when encounter period approaches roll period (synchronous / parametric roll risk) - a real training point.
5. Existing stability controls (KG, draft, Cb, ship type) remain; GM still drives roll period.
6. Page restyled to the dark maritime theme (current amber/light gradient and Turkish "Cb (blok kts.)" label fixed).

## Physics (verified formulas, no invented numbers)
- Roll natural period: T_r = 2·C·B / sqrt(GM), C ≈ 0.4 (IMO IS Code 2008 rolling-period formula form, existing in app).
- Pitch natural period: T_p ≈ 2·sqrt(T·... ) approximated from draft/length via standard naval-architecture estimate (to be sourced and cited in code; if not verifiable, pitch follows wave slope only).
- Deep-water waves: c = sqrt(g·λ/2π) (already in shader).
- Encounter period: T_e = λ / (c + V·cos μ).
- Douglas sea state → significant wave height table (WMO), wavelength from wave period.
- Motion = damped harmonic oscillator per axis forced by sampled wave slope under hull (bow/stern points for pitch, port/starboard points for roll), so motion matches the visible sea exactly.

## Technical details
- `OceanSurface3D.tsx`: make the GPU Gerstner wave set parameterised (amplitude, wavelength, direction from sea state + heading); export a CPU `sampleWaveHeight(x,z,t)` using the same wave list so the ship reads identical surface.
- `ShipScene3D.tsx`: replace heel-only motion with 3-DOF (heave, roll, pitch) damped spring forced by 4 hull sample points; static heel from stability still added on top.
- New `sim/HarbourScene.tsx`: lightweight procedural quay, bollards, fenders, breakwater (native Three.js, no new libraries, no AI images).
- New `src/lib/seakeeping.ts` + `seakeeping.test.ts`: roll period, encounter period, sea-state table, sync-roll check; tests with concrete values.
- `Stability3DSim.tsx`: mode, sea state, heading, speed controls; readouts.
- `BetaShipSimulator.tsx`: dark theme tokens.
- Mobile performance: keep current wave count, cap DPR, reduced-motion respected.

## Not included
- Real port maps/charts, collisions, multiplayer, ship handling with rudder.
- Android device test (only phone-size browser check).
