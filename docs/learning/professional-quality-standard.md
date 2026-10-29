# Curriculum-wide teaching quality — first implementation

This initiative covers the **complete 25-course, 807-topic** teaching inventory. The initial release delivers **43 individually authored topic-specific applications across all 25 course categories**, 14 custom technical vector diagrams across selected topics, and a live multi-dimensional audit. It does **not** claim all 807 lessons are fully revised. The refreshed teaching inventory still shows **343 of 807 topics with no worked example**; figures and source-link gaps are separately measured by the runtime quality audit. These are editorial gaps, not proof of factual error. Follow-on revisions should eliminate missing core pedagogy topic by topic rather than insert copied generic text.

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
