# Curriculum-wide teaching quality — first implementation

This initiative covers the **complete 25-course, 807-topic** teaching inventory. The initial release delivers **212 individually authored topic-specific applications across all 25 course categories**, no AI-generated raster or vector illustrations; only subject-specific originals with source/licence review, and a live multi-dimensional audit. It does **not** claim all 807 lessons are fully revised. The latest teaching inventory indicates **175 of 807 topics with no worked example**; figures and source-link gaps are separately measured by the runtime quality audit. These are editorial gaps, not proof of factual error. Follow-on revisions should eliminate missing core pedagogy topic by topic rather than insert copied generic text.

## Editorial acceptance criteria (per topic)

1. **Principle and mechanism:** How and why it works, not just a definition.
2. **Technical parameters:** Numbers, units, formula assumptions, signal frequencies or component distinctions when relevant.
3. **Normal procedure and failure mode:** Explain purpose, sequence, warnings and typical faults; do not invent model-specific button sequences.
4. **Worked calculation or operational scenario:** Show intermediate reasoning, not only the answer.
5. **Visual evidence:** A legible, captioned diagram, real credited photo or functional figure when a visual materially aids understanding; no decorative filler.
6. **Reference and scope:** Primary source or appropriate approved manual; separate legal requirement from recommended practice and ship-specific instructions.
7. **Understanding check:** Questions test reasoning and consequences, not only recall.
8. **Human technical review:** Officer/engineer review for operational and regulatory accuracy; never equate word count, image count or citation count with endorsement.

Use `npm run audit:lesson-quality` to inventory all courses and review the **no-worked-example**, **no-visual**, and **no-source-link** gaps. Use `npm run check:professional-cases` to check key-to-topic linkage, case steps, citations and local diagrams. This audit intentionally reports gaps but does not make the entire legacy corpus fail CI before it has been professionally rewritten.

**Priority:** (a) lifesaving, fire, GMDSS, enclosed spaces, COLREG and DP; (b) stability, cargo and machinery procedures; (c) navigation calculations and ECDIS; (d) meteorology, environmental compliance and voyage economy. Coordinate each topic with any overlapping Ship Systems long-form, Safety, Communication and legacy Topic pages. References are starting points; links alone do not establish that a scenario has been independently certified.

## Visual provenance policy (30 October 2026)

The prior 14 automatically authored teaching-flow SVGs and 3 EPIRB SVGs were withdrawn: they were not third-party originals, and illustration counts alone should not be a release goal. The on-device Beta reader now fails closed on image provenance: only exact matches in `src/data/verifiedLessonVisuals.json` appear, with their author, licence, Commons URL and course/topic/section assignment. The EPIRB device image is the genuine Commons photo **EPIRB (2).jpg**, not a drawing pretending to show satellite routing or the HRU. Unverified diagrams and ambiguous subject photos are withheld rather than substituted. Remaining code-driven navigational calculation figures are not generative imagery, but still require standards review before an educational correctness claim.

## Legacy image review (next batch)

The strict visual provenance policy now covers older Safety, Cargo and Seamanship article screens, the Seamanship photograph gallery, and the Ship Systems long-form chapter viewer. A new `src/data/verifiedLegacyVisuals.json` maps each approved original photo to a **specific legacy topic**. Its source metadata and conservative captions override unsupported descriptions such as “steel wire cross-section,” “all lifesaving appliances,” and “labelled extinguisher classes” when the referenced source is not evidence of those details. Photographs with conflicting credits in `src/assets/ship-systems/CREDITS.md` and `src/assets/IMAGE_CREDITS.md` are intentionally hidden in Ship Systems pending file-by-file source reconciliation. This does **not** certify other standalone educational pages or retroactively establish photographic authenticity from metadata alone.

The professional-case library has 212 individually authored cases; 175 of 807 curriculum topics still lack any worked example. Operational implementation must follow approved equipment documentation and bridge/engine standing orders.

## Next priority batch: collision avoidance and shipboard incident decisions

22 additional scenario-based lessons, now 105 authored professional applications, explicitly cover radar range fixes, PI, GNSS integrity, sensor cross-checks, COLREG Rules 5–8 and 19, lights, electronic-navigation contingencies, PSC evidence, restricted visibility, distress/urgency distinctions, GMDSS modernisation, grounding/collision follow-up, safe lifting, enclosed-space rescue, control-loop failures, and alternative fuel hazards. Each includes a concrete failure or decision case, three explicit reasoning steps, an operational conclusion, a misconception, and primary regulatory reading where available. No generative or unmatched illustration was introduced. The live inventory is kept in sync with the original 807 topic IDs; **282 topics still have no worked case**.

## Priority batch: 44 further authored applications (30 October 2026)

The strict original-photo and no-generative-image policy remains unchanged. This phase adds **44 individually written, topic-specific cases** across navigation (12), stability (12), GMDSS (5), safety/security (2), electrical (3), machine automation (2), seamanship (4), and cargo (4), bringing the total to **149**. The 807-topic authored-content inventory reports **238 topics without any example**. Cases introduce explicit assumptions, three-step calculations or response decisions, outcome interpretation, common errors and primary guidance. They do not represent ship-specific approval or independently certified professional training; each operating company must still validate vessel/flag equipment and live procedures.

## Third continuation wave: verified maritime calculations and technical cases (30 October 2026)

63 further unique, three-step cases have been attached to precisely indexed curriculum lessons: navigation calculations and positioning (18), machine maintenance (10), marine electrical (9), instrumentation/automation (8), MARPOL (5), fuel technology (5) and marine meteorology (8). **212 topic-specific professional cases in total**; **175 curriculum topics still have no worked example**. The editorial check now rejects duplicated example problems and requires at least three genuine reasoning steps per authored case. Cases cite source families appropriate to their specific domain (NGA Bowditch, IMO regulatory guidance, NOAA/NHC, WMO Cloud Atlas, MCA safe working practices). Exact mathematical assumptions and operational limits should still be checked by a qualified officer/engineer and against the ship's approved instructions. Image policy remains strict: no AI-generated or unverified photographs were added to this batch.
