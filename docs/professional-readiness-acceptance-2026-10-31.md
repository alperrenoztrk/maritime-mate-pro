# Mariner's Book — release and professional-quality acceptance (2026-10-31)

This is an **evidence and remediation register**, not a claim that the entire application is professionally certified.

## 1. Release / 24-language barrier
- Fix the stale JSX entity extractor assertion: the old SOLAS heading was deleted when moving to book pages; the current encoded Mariner’s Book title is now the regression fixture.
- Repair reader text below the legibility floor; use the shared inset-grouped Tools library layout.
- New `Product readiness quality` CI runs full i18n verification, UI design, numeric tests, billing contracts, offline progress, SOLAS claim guards, TypeScript and native-profile packaging.
- Android release workflow requires the same core regressions before it can build or sign an AAB.
- **Release acceptance:** a green Android Release (AAB + APK) run on the exact intended commit, followed by installing and testing the signed artifact. PR CI does not prove this on its own.

## 2. Maritime calculations
- Added independent derived/benchmark vectors to `engineeringReferenceVectors.test.ts`: cubic-breadth free surface correction, inverse displacement scaling, DOE counterflow heat exchanger example, monotonic fouling resistance, signed UKC and reserve/endurance limits.
- The LMTD kernel rejects hot-stream heating or cold-stream cooling masquerading as countercurrent cooling/heating.
- Sources:
  - US Coast Guard / IMO stability guidance: https://www.dco.uscg.mil/Portals/9/DCO%20Documents/Marine%20Safety%20Center/Tonnage/Sub-Commitee%20Docs/SLF_50-19.pdf
  - International Register of Shipping — free surface moment and correction: https://intlreg.org/wp-content/uploads/2019/04/Part-05-Stability.pdf
  - US DOE thermodynamics handbook (counterflow LMTD worked example): https://www.energy.gov/documents/doe-hdbk-1012-92vol2
  - ASHRAE Fundamentals, heat exchangers: https://handbook.ashrae.org/Handbooks/F25/SI/f25_ch04/f25_ch04_si.aspx
- **Still unverified:** many legacy hydrostatics, navigation, engine and 86 machinery-topic calculations. A green input-validation test does not establish an independently audited mathematical result or vessel/Class compliance. These remain training-only. Each needs a documented input domain, units, assumptions, published reference and at least one independent benchmark before being marked reviewed.

## 3. Android and iOS devices
- Expanded actual Android Capacitor WebView instrumentation for native boot, offline localStorage and saved reader position/text size across activity recreation.
- Android simulator test runs offline with network adapters disabled. Android instrumented tests are not physical-device acceptance.
- Added unsigned iOS simulator SDK compilation on macOS CI. This only establishes that the iOS native project links and builds.
- **Not executed or accepted:** tests on physical iPhone and Android handsets, production Google OAuth on device, actual Play purchases, iOS StoreKit (not implemented), production release install, long-session memory/performance profiling. Must be recorded against device model, OS, build SHA, locale and screen-recording evidence.

## 4. Content, regulation, and visual correctness
- Corrected a dangerous universal lifeboat-capacity × 1.25 statement. Requirements vary by vessel type and arrangements (SOLAS III/21 vs III/31 and applicable amendments).
- Removed invented shipboard equipment counts/statuses, fabricated expiry/test dates, and meaningless percentage 'readiness' scores from SOLAS reference screens.
- Preserve official LSA references: https://www.imo.org/en/ourwork/safety/pages/lifesavingappliances-default.aspx and https://www.imo.org/en/ourwork/safety/pages/summaryofsolaschapter-3-default.aspx
- The full-topic lesson-quality audit reports worked examples, images, references and checks, but does not prove technical accuracy or that every photograph depicts the exact subject. Human image-by-image comparison, copyright/licence checks and current legal source checks **remain outstanding**. Do not replace this review with generated diagrams.

## 5. Offline / performance / persistence
- Android instrumented checks and `npm run test:learning-progress` verify local edits, reconnection, race protection between accounts, and RLS simulation.
- `npm run check:native-build` checks packaged assets for native WebView, not arbitrary network services. Offline status now warns that cached tides, charts, forecasts or regulations cannot serve as current operational data. The original local-data baseline timestamp was **not** artificially advanced.
- **Still outstanding:** real-device airplane-mode acceptance after login, downloaded image and content availability, memory/CPU/scroll smoothness on low-end devices, restart recovery, storage quota exhaustion and cross-device progress reconciliation with real accounts.

## 6. Google Play monetization
- `playPurchaseSafety.ts` rejects malformed, pending, canceled, unknown-SKU, oversized or duplicate purchase tokens before server verification. Runtime refuses an invalid verification response.
- `test:billing-contract` covers subscription, one-time product, pricing, pending, restore and untrusted response contracts.
- Actual entitlement approval still depends on Google Play Developer API confirmation in the Supabase Edge Function; no simulated purchase grants Pro.
- **Critical backend blocker:** GitHub `supabase/config.toml` and `vite.config.ts` target project `vrpbhguztsqakvjcezeb`, but the connected Supabase account exposes a **different** 'MARINER'S BOOK' project `dhjvxtwflntmvbzkqsjn`. Its deployed functions list lacks `verify-purchase` and `play-rtdn`. We cannot assume these are the same production environment or safely deploy code to the other project. No production purchase, cancellation, refund, renewal or RTDN webhook was tested or changed.
- To accept live billing: verify the production project reference; deploy the *existing* repository functions to that authorized project; provision `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`, `PLAY_RTDN_SECRET`, Play Console products/base plans and Pub/Sub push; run `node scripts/check-play-billing-config.mjs` with a **dedicated authorized test account**; perform Google Play license-tester purchases/refunds, restoration after reinstall and subscription expiry, and inspect entitlements and RTDN logs. Do not transfer real credentials into Git or chat. iOS purchasing requires a separate StoreKit flow.

## Release decision
**NOT professionally certified or fully production-accepted** until all six streams have passing evidence and the live target/backend match is resolved. A green frontend TypeScript/CI job is necessary but insufficient.
