# Learning completion review — 23 October 2026

> Follow-up, 25 October 2026: the 331 depth reviews and live progress migration below have been completed. See [current completion evidence](depth-completion.md) and [live sync verification](live-sync-verification.md). Physical-device and real signed-in two-device acceptance remain pending. The rest of this document records the earlier PR scope.

This change completes the practice/remediation and account-progress follow-up to the learning-map work. It also improves selected technical explanations. It is not an independent professional review of every statement in the application.

## Learner behaviour

- All 806 topics have at least two authored checks. The 36 operational topics that had one check gain a scenario that asks the learner to apply the explanation.
- Sixteen machinery courses each gain a worked case, present in both the reader and guided session. Numerical cases state their units, boundaries and assumptions. Decision cases distinguish evidence from an unsupported conclusion. Their questions explain each distractor.
- Existing extended explanations and worked examples are also included in guided sessions. A missed question returns to its referenced teaching; an unresolved legacy reference uses the complete topic rather than guessing an association.
- First-attempt scores remain unchanged during remediation. Corrected errors are tracked separately and removed from the outstanding review list. A new attempt resets the session and shuffles options together with their feedback.
- Progress is stored under the signed-in account's device key and merged through an authenticated RPC. Legacy shared-device records require an explicit import. Reading and practice merge independently, and marking a topic unread is a timestamped change rather than a deletion that an older device can accidentally reverse.

## Deployment and data behaviour

Apply `supabase/migrations/20261022062705_learning_progress_sync.sql` through the normal reviewed database deployment process before expecting account sync. This PR does not apply the migration to a live project. If the RPC is unavailable, the app keeps local progress and displays pending sync with a retry action.

The table has owner-only RLS and the existing restrictive MFA requirement. Anonymous table and RPC access are denied. The RPC is security-invoker with an empty search path, validates incoming records and serialises merges using the owner's row lock. Account deletion cascades to the progress row. A stopped request cannot write into another signed-in account's local store.

Conflict resolution uses normalised client timestamps independently for reading and practice. Equal timestamps keep the server's existing field. This is last-write-wins progress, not a full attempt history: concurrently completed attempts do not accumulate. Significant device clock skew can affect which record wins. Stored scores indicate practice activity, not certification or demonstrated professional competence.

## Language completion

The 24 previously uncovered lesson paragraphs now have checked English. The paragraph build fails if a paragraph loses checked coverage. The current extraction contains 7,265 paragraphs, all covered. Shared English is a fallback; it is not a claim of native-language translation into every supported language.

Reviewed terminology overrides correct 88 source keys (214 language entries). They take precedence only for explicitly reviewed keys; other language-specific translations remain intact. The terminology gate now allows zero outstanding findings instead of the former 126-entry allowance. Automated terminology checks cannot prove every translation correct.

## Targeted source review

| Teaching issue | Correction and primary reference |
| --- | --- |
| Overtaking bearing | More than 22.5° abaft the beam, with the overtaking obligation continuing until finally past and clear. [USCG Navigation Rules](https://www.navcen.uscg.gov/navigation-rules-amalgamated) |
| EEXI, IAPP and IEE | Distinguishes technical efficiency, energy-efficiency certification and air-pollution certification. [MARPOL Annex VI, MEPC.328(76)](https://wwwcdn.imo.org/localresources/en/OurWork/Environment/Documents/Air%20pollution/Certified%20copy%20of%20MEPC.328%2876%29.pdf), [MCA MGN 683](https://www.gov.uk/government/publications/mgn-683-mf-imo-carbon-reduction-measures/mgn-683-mf-imo-carbon-reduction-measures) |
| RightShip rating | Current A–E comparison, with applicable EEDI/EEXI/EVDI inputs; distinct from annual operational CII. [Introduction](https://help.rightship.com/en/articles/4234771-introduction-to-the-ghg-rating), [methodology](https://help.rightship.com/en/articles/4248831-the-rightship-ghg-rating-methodology) |
| Rolling, GM and ballast | Removes universal safe-GM/period bands and automatic ballast prescriptions from the targeted quick-reference and guidance text. Uses ship-specific stability assessment and intermediate states. [IMO heavy-weather guidance MSC.1/Circ.1228](https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/Stability/MSC.1-CIRC.1228.pdf) |
| SGISC status | Describes the interim guidelines as non-mandatory; removes an unsupported prediction of mandatory implementation. [IMO ship design and stability](https://www.imo.org/en/OurWork/Safety/Pages/ShipDesignAndStability-default.aspx) |
| Mooring and heaving lines | Removes universal rope-retirement, drum-turn and weighted-monkey-fist advice from the reviewed paragraphs. [MCA COSWP 2026](https://www.gov.uk/government/publications/code-of-safe-working-practices-for-merchant-seafarers-2026-edition), [MCA weighted heaving-line bulletin](https://www.gov.uk/government/publications/safety-bulletin-2-dangerously-weighted-heaving-lines/safety-bulletin-2-dangerously-weighted-ships-heaving-lines), [IMO MSC.1/Circ.1620](https://wwwcdn.imo.org/localresources/en/Documents/MSC.1-Circ.1620%20-.pdf) |
| Liferaft float-free release | Distinguishes the securing arrangement, painter, weak link and hydrostatic release. [Hammar H20](https://www.cmhammar.com/h20-release-units/) |
| Enclosed-space drills | Corrects the frequency reference to SOLAS III/19.3.3 and distinguishes drill content from entry authorisation. [RMI Marine Notice 7-041-1](https://www.register-iri.com/wp-content/uploads/MN-7-041-1.pdf) |
| Cylinder lubrication | Replaces universal oil/iron thresholds with maker-specific selection and monitoring. [Everllence service letter SL2025-776](https://www.everllence.com/docs/default-source/service-letters/sl2025-776.pdf) |
| Energy boundary example | States the closed-system boundary and heat/work sign convention. [OpenStax first law](https://openstax.org/books/university-physics-volume-2/pages/3-3-first-law-of-thermodynamics) |

## Remaining editorial work

`content-audit.json` inventories actual teaching text, examples, formulas and tables. It excludes identifiers, headings and integrated rule appendices. The 150-word threshold flags 331 topics for editorial inspection; it is not a claim that every short definition is inadequate or that every long lesson is good. Prioritise concept-specific explanations, diagrams and applications where the learning outcome needs them, rather than padding text to pass a word count.

The complete regulatory and technical corpus still needs subject-matter review, current applicability checks and consistent source attribution. Physical Android/WebView testing is also required before release; the local browser and native web-bundle checks do not substitute for that device test.

## Verification evidence

The final integration uses main commit `7b58fe7992f4c575f95c6a20b0165d00186062b0`, including the newer route-motion and preview-auth fixes.

- TypeScript and ESLint checks pass.
- Topic coverage/schema, operational curriculum, hierarchy, question-bank, rule-placement and library checks pass. The hierarchy includes 25 courses, 154 modules, 806 topics and 2,110 lesson checks. Its 4,353 course-bank questions are preserved; the broader bank validator additionally counts the separate 180-question general machinery bank, for 4,533 overall.
- Seven progress unit tests plus the real PostgreSQL/PGlite migration tests pass, covering owner isolation, MFA, anonymous denial, stale writes, unread changes, offline retry and account deletion.
- Translation verification passes across 24 locales, using checked English fallback where needed: zero terminology/sense findings and 7,265/7,265 paragraph coverage.
- SVG text, UX and design-system guards pass. The native web bundle passes the size budget at approximately 17.51 MiB total and 1,463 KiB for its largest JavaScript chunk. Navigation and stability narratives are separate chunks to keep the shared lesson chunk within the existing limit.
- Playwright passes at 390 × 844 and 1280 × 900: learning-map discovery, paths, search, hierarchy, persistent review, module links, retained references, guided scores, taught retries, worked examples, account transport and failed-sync recovery. In the deterministic practice case, six wrong first answers followed by six correct retries retain the first score of 0/6 and clear the review queue. All account/backend fixtures are synthetic.

Screenshots: [mobile map](screenshots/learning-map-mobile.png), [desktop map](screenshots/learning-map-desktop.png), [reader](screenshots/topic-mobile.png), [guided result](screenshots/guided-result-mobile.png), [practice result](screenshots/practice-result-mobile.png).
