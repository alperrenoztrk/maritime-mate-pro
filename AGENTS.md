# Architecture rules

- RouteMotionFrame owns route push/pop motion; keep layout, stacking and opaque page surfaces outside animated variants so transitions only animate transform and opacity.
- Home instruments keep calibrated photos and live overlays in a fixed-aspect visual region, separate from headers and readouts, so readable text never obscures the instrument scale.- Study activity (recent "Continue" + "Saved" bookmarks) lives in src/lib/studyActivity.ts in localStorage and is recorded by AppNavBar from route patterns; add new study routes to its RULES list instead of tracking per page.
- The Library hub lists every app resource from src/data/libraryResources.ts (deck/engine from betaLessons + static links in libraryResourceLinks.ts); add new resource pages there so Library stays the single place to reach everything.
- Reviewed simulator UI copy is compiled by the learning-pack builder into the existing shared English fallback, so offline lookup and strict coverage agree without rewriting oversized locale dictionaries.
- Billing offer loading and selection live in billingOffers: product-type failures are isolated and displayed subscription prices use the same offer-selection rule as purchase tokens, avoiding blank prices and mismatched offers.
