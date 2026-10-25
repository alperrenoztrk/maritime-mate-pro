# Architecture rules

- RouteMotionFrame owns route push/pop motion; keep layout, stacking and opaque page surfaces outside animated variants so transitions only animate transform and opacity.
- Home instruments keep calibrated photos and live overlays in a fixed-aspect visual region, separate from headers and readouts, so readable text never obscures the instrument scale.- Study activity (recent "Continue" + "Saved" bookmarks) lives in src/lib/studyActivity.ts in localStorage and is recorded by AppNavBar from route patterns; add new study routes to its RULES list instead of tracking per page.
