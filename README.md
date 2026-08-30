# Maritime Mate Pro / Mariner's Book

Maritime Mate Pro is a React + Vite + Capacitor maritime education and onboard-reference application. The project combines deck and engine-room learning content, formulas/calculators, regulatory references, operational check material, question banks and mobile-oriented workflows in one codebase.

> **Safety boundary:** this application is an educational/reference tool. It does not replace the vessel's approved manuals, loading computer/stability booklet, maker instructions, company SMS, flag Administration requirements, class rules, Master's/Chief Engineer's orders or the current official text of IMO instruments.

## Main knowledge areas

### Deck
- Navigation and COLREG reference
- Bridge equipment and ECDIS/radar/AIS/GMDSS topics
- Stability and hydrostatics
- Cargo handling, IMSBC/Grain/IMDG reference
- Seamanship, anchoring and mooring
- Safety, LSA/FFA and emergency topics
- Meteorology and marine environment
- Communications

### Engine room
- Thermodynamics and fluid mechanics
- Machine elements
- Marine diesel engines
- Ship and auxiliary systems
- Fuel and lubricating-oil topics
- Cooling/HVAC
- Electrical and automation
- Engine-room operations and safety
- Maintenance and ERM
- Energy efficiency and environmental topics

## Regulatory content governance

Maritime rules change and their applicability depends on vessel characteristics. Content must therefore distinguish between:

- **Learning theory** — concepts and worked examples
- **Reference information** — quick factual lookup
- **Operational guidance** — procedures that still require vessel/SMS verification
- **Regulatory information** — exact instrument/applicability must be retained
- **Vessel/manufacturer-specific information** — never generalized as a universal IMO limit

Safety-critical calculators must not return conclusions such as `SAFE`, `COMPLIANT`, `ENTRY PERMITTED` or equivalent unless the complete governing criteria are actually represented. A numeric comparison should instead state what was compared and what remains to be verified.

### 2026 reference baseline

The regulatory dataset is being maintained against current official IMO publications and effective amendments. Examples include:

- SOLAS 2024 consolidated publication baseline, with later amendments/supplements checked separately
- Modernized GMDSS framework in force from 1 January 2024
- GMDSS Manual 2024
- NAVTEX Manual 2023
- IAMSAR Manual 2025; amendments applicable from 1 January 2026
- IMDG Code 2024 Edition, Amendment 42-24; mandatory from 1 January 2026
- 2008 IS Code as amended

The repository must not treat a publication-edition label alone as proof that every embedded rule is current. Clause-level applicability remains required.

## Tech stack

- React 18
- TypeScript
- Vite
- Capacitor 7 (Android/iOS)
- Tailwind CSS
- React Router
- Supabase client
- React Query
- Framer Motion

## Development

Install dependencies:

```bash
npm install
```

Run the web development server:

```bash
npm run dev
```

Type-check:

```bash
npm run typecheck
```

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Native-mode build:

```bash
npm run build:native
```

## Validation commands

The repository includes dedicated checks for content, formulas, navigation, localization and native regressions. Useful commands include:

```bash
npm run test:formulas
npm run test:validation
npm run check:topic-coverage
npm run check:topic-schema
npm run check:operational-curriculum
npm run check:curriculum-hierarchy
npm run check:rule-integration
npm run i18n:verify
npm run test:native-boot
npm run test:secure-storage
```

Run `npm run typecheck` and the relevant targeted checks before merging content or calculation changes.

## Native development

Synchronize Capacitor platforms:

```bash
npm run cap:sync
```

Build Android bundle:

```bash
npm run android:bundle
```

Build/sync iOS project:

```bash
npm run build:ios
```

## Knowledge architecture

Course/formula content is centered under:

```text
src/data/courseContent/
```

Regulatory mapping is maintained under:

```text
src/data/compliance/
```

Operational/reference datasets such as bridge-device material and other domain data are maintained under:

```text
src/data/
```

Hydrostatic and other calculation services live under:

```text
src/services/
```

## Maritime-content contribution rules

When adding or changing maritime information:

1. Prefer current official IMO/ILO/flag/class/manufacturer sources over secondary summaries.
2. Record the actual convention/code/regulation or other source context where practical.
3. State applicability: ship type, GT, construction date, cargo, sea area, equipment configuration or other relevant condition.
4. Do not convert company/SMS practice into a universal SOLAS/IMO requirement.
5. Do not invent minimum/maximum values to make a calculator produce a pass/fail result.
6. For maker-dependent machinery or bridge equipment, make the dependency explicit.
7. For stability, cargo and life-saving compliance, direct operational verification to the vessel's approved documentation.
8. For enclosed-space entry, gas readings alone must never authorize entry.
9. Keep formula units explicit and dimensionally consistent.
10. Add/update validation coverage when a safety-critical calculation changes.

## Disclaimer

Maritime Mate Pro can support learning, revision and structured reference, but responsibility for safe navigation, engineering operation, cargo work and statutory compliance remains with the qualified personnel using the vessel's approved procedures and authoritative documentation.
