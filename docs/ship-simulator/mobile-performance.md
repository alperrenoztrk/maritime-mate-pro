# Mobile performance and free seakeeping motion

The beta simulator no longer adds a constant list or a beam-wind moment. `heelRad` is zero; its roll, pitch and heave are forced by the selected sea. The Wind / Roll Moment slider is removed. The separate stability-calculation view retains its manual heel and trim controls.

## Render and CPU budgets

| Work | Previous default | New phone default |
| --- | --- | --- |
| Water mesh triangles | 32,768 | 8,192 |
| Wave evaluations in each water fragment | 12 | 0 (interpolated analytic vertex normals + two ripple maps) |
| Device pixel ratio cap | 1.25 | 1 |
| Continuous rendering | Display refresh rate | Demand rendering, 30 Hz timer |
| Shadow pass | Enabled | Disabled |
| Waterplane forcing | 120 samples/s | 30 samples/s; dynamics still integrate at 120 Hz |
| Live React updates | Whole simulator, 10/s | Instrument subscribers only, 4/s |

Performance is selected initially on narrow screens or coarse pointers. Balanced uses a 96 × 96 mesh at 30 Hz. High keeps per-fragment analytic waves and shadows at up to 60 Hz. All tiers retain the same twelve-component wave spectrum, hull response, foam and moving ripples. Lower tiers fade distant displacement into the fog to avoid a jagged, undersampled horizon.

The expensive inverse sampler also exits once its world-coordinate solution converges. The paused/offscreen/hidden render timer is cleared. Numeric instrument values opt out of the app's translation observer. Resuming discards the paused time gap rather than advancing the sea through it.

## Measured checks

CPU comparison against `c76065656e92630ac0c56239815053b08dd1474a`: one warm-up plus seven runs, each simulating 120 seconds at 30 rendering frames/s, Hs 3.25 m, T 10 s, beam seas, speed 0.16 scene units/s, roll frequency 0.8 rad/s and damping 0.12. Node 24 on the same host, both versions alternated in one process. Median time fell from **1,086.8 ms to 330.0 ms (69.6%)**. This measures the clock and vessel forcing/integration, not GPU rendering, whole-app frame rate or phone battery use.

Browser instrumentation reports **21,022 triangles and 27 draw calls** in Performance mode for the default container scene, versus 31,262 triangles in Balanced and 86,558 in High. Water vertices are 4,225 / 9,409 / 37,249 respectively. These are workload counts, not physical-device FPS measurements.

`npm run test:seakeeping` includes:

- Both signs of roll and pitch, with no persistent list/trim, for following, quartering, beam, bow and head seas over 120 simulated seconds.
- Rougher water increases response; flat water remains upright; released roll/pitch cross upright and decay.
- Identical response at 15/30/60/120 fps and stable rapid sea changes.
- The 30 Hz forcing remains within 0.2° of the original 120 Hz response in the tested rough beam-sea case.

`npm run check:ocean-ui` checks the actual beta component: bidirectional roll/pitch observed over 22 seconds, absence of the wind slider, active render budget, paused/offscreen render counts, pixel-identical paused water/vessel/exhaust, all quality tiers and their resource counts, restart/resume, calm equilibrium, all five vessels, harbour, 375/320 px layouts, default phone quality, reduced motion and the separate calculation view. Its temporary fixture blocks external requests and is removed afterward. Results and screenshots are written to `tmp/ocean-ui/`.

Physical iPhone/Android GPU frame rates, sustained thermal throttling and battery use remain unmeasured. The software-rendered Chromium check validates behavior and render budgets; it is not a phone performance benchmark. High detail is deliberately more expensive.
