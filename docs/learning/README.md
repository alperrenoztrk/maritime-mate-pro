# Maritime learning structure

The lessons library now explains the whole ship before asking a newcomer to choose a department or subject. `/lessons/map` connects five knowledge branches to the 25 existing courses, their modules and all 806 lesson topics. It is linked from both Home and Lessons. Beginner, deck and engine reading sequences are recommendations; they do not restrict access or certify competence.

## Behaviour and preservation

- Each course has an authored purpose, three learning outcomes, useful background, related courses and links to shipboard systems, operations, personnel or regulations.
- Every lesson reader shows its course/module location, the module's meaning, an internal contents list, the preceding and following topic, practice and a review toggle.
- All deck topic placements are explicit in `curriculumTopicPlacement.json`. Source order and substring matching no longer determine a topic's branch. Existing topic IDs, titles accepted by old links and the original lesson data are retained.
- The six specialised legacy course screens remain available at `/lessons/<course>/reference`. The primary topic routes now use the shared curriculum instead of shadowing it.
- `machineContentOwnership.json` chooses the canonical authored version of each machinery topic. Earlier worked examples and formulas are retained without repeating identical examples/formulas. Expanded narratives previously hidden behind the first match are reachable. Two original worked applications explain PID contributions and a pump/system operating point.
- All 104 rule groups have an explicit destination in `curriculumRulePlacement.json`, including cross-course destinations where a machinery rule originally lived under an unrelated subject. There are 193 integrated rule sections and 570 rule items.
- Topic practice uses questions authored for that topic and section. The complete 4,353-question course banks remain independently accessible; questions are not forced into unrelated lessons to fill an empty row. The 36 operational/supplementary topics previously lacking a check now have two. Sixteen machinery worked cases add another check each, bringing the authored lesson checks to 2,110.
- Guided sessions resolve source identities as well as display titles. If an expanded narrative replaced an old subsection, the complete narrative precedes its questions. Every explanation and question is retained. Answer positions vary without changing grading.
- Reading and practice records are scoped to the signed-in account, retained locally and synced through an owner-only, MFA-aware RPC. Legacy shared-device progress requires explicit import. Offline work is retried and old-account responses are ignored. Scores retain the first attempt while remediation tracks corrected errors separately. See [deployment and conflict behaviour](completion-review.md).
- The checked English for new learning copy is generated into one shared offline pack rather than duplicating the same prose across 24 language files. Existing checked language-specific translations take precedence, except for explicitly reviewed corrections in the terminology override pack.
- The navigation introduction now distinguishes geoid and ellipsoid and states axial tilt relative to the normal to the orbital plane.

## Content standard for future additions

A topic needs an explicit parent, a stable identity and a meaningful level. Teach the concept and its assumptions, explain the mechanism, connect it to a shipboard system or decision, and provide an appropriate example or case. Identify units, sign conventions and limitations in calculations. Attach questions to the concept they measure, and distinguish a reading recommendation from a professional qualification or permission to operate equipment. Prefer an accurate short explanation to repeated padding; the current corpus still varies in depth and this change is not an expert review of every existing technical or regulatory assertion.

Add or revise canonical content ownership and placement deliberately when introducing another edition. Do not append a competing topic definition and assume it will become visible. The data checks reject unclassified topics, unresolved rule destinations, missing checks, invalid links and circular background recommendations.

## Verification

- `npm run check:curriculum-hierarchy`: 25 courses, 154 modules, 806 topics, 2,110 lesson checks, 4,353 preserved general-bank questions; each question follows its teaching, and all existing explanation sections remain in its session.
- `npm run check:rule-integration`: every rule group has exactly one authored destination and all rule items reach the lesson reader.
- `npm run check:learning-ui`: Playwright checks discovery, reading-path switching, tree search, correct Appraisal placement, persistence across reload, module deep links, retained references, completed guided practice, saved results and mobile/desktop overflow. Backend/account fixtures are synthetic and confined to a local test server. Install Playwright Chromium normally, or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to a local compatible binary.
- Typecheck, lint, terminology/translation verification, native build and the existing design, library and UX guards accompany these checks.

Screenshots: [mobile map](screenshots/learning-map-mobile.png), [desktop map](screenshots/learning-map-desktop.png), [mobile reader](screenshots/topic-mobile.png).

## References for the targeted teaching corrections and applications

- [NOAA: the geoid and ellipsoid](https://oceanservice.noaa.gov/education/tutorial_geodesy/geo03_figure.html)
- [NASA: axial inclination relative to the perpendicular](https://pwg.gsfc.nasa.gov/stargaze/Lseason.htm)
- [MathWorks: parallel PID controller form](https://www.mathworks.com/help/control/ref/pid.html)
- [KSB: pump operating point](https://www.ksb.com/en-global/centrifugal-pump-lexicon/article/operating-point-1117036)

The numerical examples are original teaching models and are not installation-specific operating settings. The progress migration was applied to the existing live database on 24 October 2026; see [deployment verification](live-sync-verification.md). No application version bump or application deployment is included.

## Completion checks

- `npm run test:learning-progress`: account isolation, field merge, unread tombstones, offline retry, concurrent local edits, storage failure, actual PostgreSQL RPC/RLS, MFA and deletion cascade.
- `npm run check:learning-content`: current inventory, at least two checks per topic, review teaching, worked-case visibility and feedback/answer alignment.
- `npm run i18n:verify`: complete extracted coverage, zero terminology/sense findings and complete checked paragraph coverage.

See [the completion review](completion-review.md) for deployment requirements, source corrections and remaining editorial work.

## Applied teaching follow-up

All 331 previously flagged short topics now include a distinct application with reasoning and limits, available in both reading and guided modes. Primary further-reading links and checked offline English accompany the additions. See [scope, evidence and limits](depth-completion.md). The updated inventory has zero topics below the original 150-word triage threshold.
