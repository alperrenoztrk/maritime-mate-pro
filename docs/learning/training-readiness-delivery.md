# Maritime training readiness delivery

This iteration introduces two **editorial** STCW reading pathways (A-II/1, A-III/1) that reuse the existing canonical lesson pages, separates the existing PSC preparation worksheet from a new **independent** tanker SIRE 2.0 readiness aid, clarifies the scope of officer exam practice, and identifies knot-video connectivity requirements.

## Source-of-truth boundaries

- [STCW framework](https://www.imo.org/en/ourwork/humanelement/pages/stcw-convention.aspx): study topics, self-checks, and practice scores do not establish STCW competency or a certificate. Flag/administration and approved training requirements prevail.
- [IMO Port State Control](https://www.imo.org/en/ourwork/iiis/pages/port%20state%20control.aspx) and [A.1206(34) Procedures for PSC, 2025](https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/AssemblyDocuments/A.1206%2834%29.pdf): the existing PSC list is a general preparation checklist, not a full survey protocol; vessel applicability must be reviewed independently.
- [OCIMF SIRE 2.0](https://www.ocimf.org/programmes/sire-2-0/): vessel-specific CVIQ is assembled through OCIMF. The new SIRE page provides original coordination prompts only; it does not reproduce OCIMF's question library or create formal inspection records.
- Knot tutorials link to external YouTube videos. Step text may be available offline; video playback needs connectivity.

## Validation and release limits

Run `npm run typecheck`, `npm run lint`, `npm run check:library-interface`, `npm run test:study-guides`, `npm run build:native`, and mobile/desktop navigation checks. Then validate routes, scroll, accessibility text sizing, storage survival, and log-in/out isolation on physical Android devices. No live-device, signed-in multi-device, store, or regulated-content sign-off is asserted by this PR.

## Next editorial steps

1. Have licensed subject-matter reviewers verify competence coverage and the accuracy of linked material against current STCW tables (A-II/2, A-III/2 and specialist endorsements later).
2. Review all PSC prompts for applicability, references, wording and maritime jurisdiction; add vessel-type filtering only after a complete applicability matrix exists.
3. Replace externally streamed knot demonstrations with licensed/self-authored media and offline fallbacks if offline video use is required.
4. Run a 20–30-person task-based pilot with independently observed learning gains, completion rates and seven-day retention; do not present fabricated metrics.
