# Subject reader consolidation

## Target
Replace the endless-scroll subject narrative screens with the same mobile book interface used by Legislation. Preserve authored formulas, examples, technical figures, credits, tabular references, inspection guidance and source citations. Keep calculators, quizzes, navigational maps and drills operational.

## Migrated subject families
- Main textbook topic routes: Deck and Engine lessons (existing), Regulated instruments (existing).
- Older reference libraries: Stability, Cargo, Safety, Seamanship, Environment, Economics, Fluid Mechanics (this PR).
- Professional reference articles: Bridge devices, shipboard tasks, crew roles, crew task deep dives, ship systems deep dives and ship operations deep dives (this PR).
- SOLAS chapter reference modules: chapters, certificates, ship requirements and safety equipment (this PR).
- Stability individual formula details (this PR).
- Meteorology theory, weather systems, pressure patterns, storms, cloud types, forecasting, safety and interactive weather references; an expanded tabbed fallback remains for non-reading interactions (this PR).

## Reading behavior
One conceptual page at a time, Previous / Next, Contents, proportionate progress, persistence per topic, keyboard arrows, touch swipe and adjustable text size. Long tables and text can still scroll **inside the active page**; nothing is clipped or deleted. Original source text is split at paragraph boundaries and preserved in original order. No generated illustrations were introduced.

## Non-reader routes intentionally retained
Tools/calculators, active exercises and quizzes, simulations, dashboards, searchable topic indices, interactive map and forecasting tools, and the guided micro-learning session (already one teaching step/question at a time). Legislation's long-form continuous Full Reference remains a selectable fallback rather than the default.

## Validation
- `npm run test:reader-pagination` includes regulation coverage, exact paragraph preservation and a guard for 22 integrated teaching routes.
- Reader pagination quality workflow: npm ci, suite, TypeScript check and production build.
- Existing curriculum and numerical-quality workflows must remain green.

## Limitations
This is an **interface migration**, not a legal/currentness review or independent formula audit. Text and diagrams remain the original supplied material. Legislation, SOLAS and navigation safety must always be validated against current official instruments and vessel-approved documents. Extremely long single paragraphs, figures and tables may still require scrolling inside a single book page. Mobile device QA (iPhone, Android, dark/light modes, real content translation and accessibility) is recommended before release.
