# Applied teaching completion — 24 October 2026

All 331 topics flagged in the previous inventory now have an additional authored application: a mechanism or distinction, a concrete problem, at least two reasoning steps, and a conclusion with relevant limits. The original concepts, formulas, IDs, routes and 2,110 checks remain available. The additions contain approximately 28,600 English words; numerical examples are original teaching models, not installation-specific settings.

The immutable triage baseline is `1818fa67293606cf82b59c16afe848137253f538`; `depth-review-targets.json` preserves its exact 331 IDs. The audit checks equality with that set, unique scenarios, correct course/title mapping, reader visibility, exactly-once guided teaching, reference links and offline English copy. All 807 topics now exceed the original 150-word triage threshold. Word count remains an editorial indicator, not a competence score or independent expert certification.

| Course | Added applications |
| --- | ---: |
| machine-diesel-engines | 34 |
| machine-fluid-mechanics | 25 |
| machine-machine-elements | 31 |
| machine-thermodynamics | 18 |
| navigation | 2 |
| machine-ship-systems | 25 |
| machine-auxiliary | 22 |
| machine-fuel-technology | 16 |
| machine-cooling-hvac | 19 |
| machine-electrical | 7 |
| machine-automation | 8 |
| machine-engine-room-ops | 21 |
| machine-maintenance | 10 |
| machine-engine-room-safety | 26 |
| machine-environment-machine | 29 |
| machine-erm | 20 |
| machine-energy-efficiency | 18 |

## Delivery

`learningDepthReviews.json` contains the applications. The common lesson model exposes them in the reader and guided sessions. `learningDepthSources.json` provides course-level primary further reading; these links support continued study and are not a claim that every existing assertion has been independently certified. Fundamental engineering references are not substitutes for current class rules, flag requirements or the installed equipment's approved manual.

Checked English is included once in the shared offline language pack. Other languages retain this reviewed English when a reviewed translation is unavailable. Cache version 5 prevents an older pack from hiding the additions. The pure content module has its own native chunk to preserve the bundle-size limit.

The progress migration is now live on the app's existing database. See [deployment evidence](live-sync-verification.md). Its MFA helper reference and local test fixture were corrected to reflect the existing `private` schema. The separate similarly named Supabase project was not changed.

The Android test replaces the template's incorrect package assertion with checks against the actual packaged application. See [device acceptance and reproduction](android-device-check.md). Physical-device and real signed-in two-device acceptance require actual device evidence and are not represented as completed by browser or schema tests.

## Primary reference notes

- Navigation: [NGA American Practical Navigator](https://msi.nga.mil/Publications/APN), including velocity-vector reasoning.
- Engineering fundamentals: [DOE thermodynamics](https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1012-92_VOL1.pdf), [fluid flow](https://www.energy.gov/documents/doe-hdbk-1012-92vol3), [materials](https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1017-93_VOL1.pdf), [electrical science](https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1011-92_VOL3.pdf) and [control](https://www.energy.gov/sites/default/files/2026-04/DOE-HDBK-1013-92-VOL2.pdf).
- Operational safety: [MCA COSWP 2026](https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition), particularly isolation, enclosed spaces and coordinated emergency response; UK guidance is not a statement that every vessel has identical statutory requirements.
- Pollution: [IMO MARPOL overview](https://www.imo.org/en/about/conventions/pages/international-convention-for-the-prevention-of-pollution-from-ships-%28marpol%29.aspx), [chemical carriage](https://www.imo.org/en/ourwork/environment/pages/chemicalpollution-default.aspx), [IMDG](https://www.imo.org/en/ourwork/safety/pages/dangerousgoods-default.aspx), and [ballast implementation](https://www.imo.org/en/mediacentre/hottopics/pages/implementing-the-bwm-convention.aspx). The examples distinguish pollutant streams and do not turn a monitor reading or equipment approval into blanket discharge permission.
- Emissions: [IMO EEXI/CII](https://www.imo.org/en/mediacentre/hottopics/pages/eexi-cii-faq.aspx) and [European Commission maritime ETS FAQ](https://climate.ec.europa.eu/areas-action/transport-decarbonisation/reducing-emissions-shipping-sector/faq-maritime-transport-eu-emissions-trading-system-ets_en). The ETS example explicitly separates emissions year from surrender year.
- Training: [IMO STCW framework](https://www.imo.org/en/ourwork/humanelement/pages/stcw-convention.aspx). Application quizzes and reading completion are not professional certification.

No application version change or application deployment is included. The new npm lockfile change only aligns the existing main-branch DOMPurify requirement with reproducible npm installation.

## Validation — 25 October 2026

The latest lighthouse lesson is preserved from main. Local checks passed for content and hierarchy (25 courses, 154 modules, 807 topics, 2,110 checks), operational coverage, rule integration, question banks, SVG, UX, design and library consistency. Seven progress unit tests and PostgreSQL isolation/MFA/merge tests passed, as did secure-storage and native-boot regressions. Playwright passed the mobile/desktop learning paths, applied examples, primary links and synthetic account/offline flows.

The native build passed its budget: 827 JavaScript files, 17.87 MiB total and 1466.4 KiB maximum chunk. The API 35 emulator application JUnit report from run `40181361047` records two tests, zero failures, zero errors and zero skips (17.095 seconds). A subsequent unrelated plugin test failed; the workflow is now explicitly scoped to the application. Physical-device and real-account two-device checks remain pending.
