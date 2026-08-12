# Remove Turkish from the app

Goal: the user never sees Turkish anywhere — not as a language option, not as a leaked untranslated string. All interface text is authored in English; lesson/curriculum data stays in its current Turkish source and keeps being translated at runtime into the selected language.

## Current state (verified)

- `src/contexts/LanguageContext.tsx:66` lists Turkish (`{ language: 'tr', name: 'Turkish', displayName: 'Türkçe' }`) as the first of 25 languages.
- `src/utils/pageTranslator.ts:8` sets `SOURCE_LANGUAGE = 'tr'`: every interface string is written in Turkish in the code and machine-translated at runtime. Translation requests are sent with `sl=tr`.
- Turkish source text lives in ~1030 files: 156 in `src/pages`, 109 in `src/components`, 709 in `src/data`, plus ~50 in hooks/lib/utils/services/contexts.
- Offline dictionaries in `public/locales/*.json` (12 MB for English) are keyed by the Turkish source strings.

## What changes

### 1. Turkish disappears as a language (small, immediate)
- Remove the `tr` entry from the supported-language list.
- Anyone whose saved preference is `tr` is silently migrated to English on next load.
- Remove Turkish-only labels in the interface (for example the `labelTr` font-size labels in `src/contexts/font-size-context.ts`) and any remaining hard-coded Turkish words in language/settings screens.

### 2. Interface text rewritten to English
Every user-visible string in the interface layer becomes English in the code — pages, components, hooks, toasts, empty states, error messages, aria-labels, alt text, button labels, dialog copy. Lesson/curriculum data under `src/data` is not touched.

Because this is roughly 300 files, it runs in reviewable waves, each verified before the next:

```text
Wave 1  Global chrome: navbar, home, settings, auth, search, notes, errors
Wave 2  Calculation screens and shared calculation UI
Wave 3  Lesson / curriculum / library screens (UI shell only, not content data)
Wave 4  Remaining components, hooks, services, utils, toasts
```

### 3. Translation engine adapted to mixed source
With English interface text and Turkish data text on the same page, sending everything as `sl=tr` would corrupt the English strings. Changes:
- Requests go out with source language `auto` instead of `tr`, so English passes through untouched and Turkish data is translated.
- When the selected language is English, a string that is already plain English (no Turkish characters, no dictionary entry) is left as-is instead of being sent to the translator — fewer requests, no mistranslation risk.
- Existing offline dictionaries stay valid: they are keyed by the Turkish data strings, which are unchanged.

### 4. Verification
- Automated scan that fails if any user-visible string in the interface layer still contains Turkish characters or known Turkish words.
- Browser pass over the main screens (home, settings, calculations, lessons, library, notes, auth) in English and in one other language, checking for leftover Turkish and for layout overflow caused by longer English words.

## Technical notes

- `SOURCE_LANGUAGE` stays exported but is used only for the data layer and dictionary keys; the network call switches to auto-detect.
- The route harvester (`src/utils/routeHarvester.ts`) collects source text for pre-translation; its harvest version constant is bumped so stale caches keyed to Turkish interface strings are discarded.
- Cached translation stores in localStorage/IndexedDB are invalidated by the same version bump, so users do not see a mix of old Turkish-derived and new English strings.
- Turkish code comments and internal identifiers are left alone unless they surface in the interface.

## Out of scope

- Translating `src/data` content into English in the codebase (kept Turkish per your choice, rendered in the user's language at runtime).
- Adding or removing any other language.
