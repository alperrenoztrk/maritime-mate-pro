# Build-time pre-translation (i18n)

The bulk of the app's user-visible text is static Turkish content in
`src/data/*.ts`. It is pre-translated **once at build time** with the
maritime-aware AI + glossary and shipped as per-language JSON under
`public/locales/<lang>.json`. At runtime the translator
(`src/contexts/LanguageContext.tsx` → `translateText`) consults these
dictionaries first — an instant, network-free, offline-capable hit — and only
falls back to the live translator for anything not covered (dynamic strings).

## Workflow

```bash
# 1. Extract unique static source strings -> scripts/i18n/source-strings.json
npm run i18n:extract

# 2. Pre-translate with the maritime AI (needs an API key). Examples:
LOVABLE_API_KEY=xxxx npm run i18n:pretranslate -- --lang=en          # one language
LOVABLE_API_KEY=xxxx npm run i18n:pretranslate -- --lang=en,de,es     # several
LOVABLE_API_KEY=xxxx npm run i18n:pretranslate -- --lang=all          # every target
LOVABLE_API_KEY=xxxx npm run i18n:pretranslate -- --lang=en --limit=500  # cap (cost control)

# 3. Report coverage
npm run i18n:check            # or: npm run i18n:check -- --strict

# 4. Apply the contextual correction layer to the shipped dictionaries
#    (run after changing the maritime glossary or contextual-corrections.mjs)
npm run i18n:fix

# 5. Audit the terminology of the shipped dictionaries
npm run i18n:audit-terms                  # report
npm run i18n:audit-terms -- --strict      # fail on findings (part of i18n:verify)
```

Then commit the generated `public/locales/*.json`.

## Protected abbreviations

Generic engines treat an abbreviation they do not know as a typo and "correct"
it. On this corpus that produced `DP → XP`, `KB → NW`, `ARPA → Barley`,
`COW → KUH` (de) and `IMO → Meiner Meinung nach` (de). The damage lands almost
entirely in SHORT strings — labels, table cells, headings — because there is too
little context for the engine to recognise the term.

`src/utils/protectedTerms.ts` holds the abbreviations that occur in `src/data`
and masks them with a sentinel the engine leaves alone, then restores them —
verbatim, or as the language's established equivalent (`IMO` = `OMI` in French,
`PPE` = `PSA` in German). Every translation path applies it: the runtime
translator, this generator, the AI pre-translation and the Supabase `translate`
function. Add new abbreviations to `PROTECTED_TOKENS`; matching is
case-sensitive, so the stability symbol `KG` is protected while the unit `kg`
is not.

To repair dictionaries generated before this layer existed:

```bash
npm run i18n:audit-terms      # what is damaged, and where
npm run i18n:repair           # drop those entries (dictionary + cache)
npm run i18n:generate         # re-translate exactly those strings, protected
npm run i18n:fix
```

## Contextual corrections

Generic machine translation translates each string in isolation, so
context-dependent Turkish gets mistranslated ("Demir" → "iron" instead of
"anchor", "Üstü:" → "Above:" instead of "Reports to:", "İkinci Zabit" →
"Chief Officer"). Two curated layers fix this:

- `contextual-corrections.mjs` — human-verified whole-string fixes, highest
  priority everywhere (generation, pretranslation and `i18n:fix`).
- the maritime glossary (`supabase/functions/_shared/maritimeGlossary.ts`) —
  deterministic per-language terminology, applied at build time AND at runtime
  (the runtime consults it before the shipped dictionary, see
  `resolveLocally` in `src/contexts/LanguageContext.tsx`).

## Notes

- **Order of precedence per string:** contextual correction
  (`contextual-corrections.mjs`) → curated maritime override
  (`getMaritimeTranslationOverride`) → AI translation (Gemini, maritime prompt +
  glossary hint) → `applyMaritimeCorrections`. Same glossary the runtime uses,
  so terminology is consistent.
- **Incremental:** `scripts/i18n/.cache/<lang>.json` remembers prior
  translations; re-runs only translate new/changed strings (cost control).
- **No key?** `i18n:pretranslate` still writes an *override-only* dictionary
  (curated maritime terms) and warns. The runtime degrades gracefully to the
  live translator for everything else, so there is no regression.
- **Key parity:** dictionary keys use the same `normalizeSource` (trim) as the
  runtime. Markdown-rendered fields (`content`) are emitted as their rendered
  text segments to match the runtime DOM text nodes.
- **What is extracted:** every user-visible property in `ALLOWED_PROPS`,
  including the longform `lead` / `bullets` / `headers` / `rows` / `sources`
  fields (arrays are walked recursively — a table body is `string[][]`).
  `paragraphs` is intentionally excluded: 11k strings of ~175 characters would
  add ~4 MB per language, and long prose is where the engine holds up. Those
  paragraphs are translated live, with the same protection applied.
- **Delivery:** locale JSONs are excluded from the PWA precache
  (`globIgnores`) and cached on demand (`runtimeCaching`), so only the selected
  language is downloaded.
- **Regenerable intermediates** (`source-strings.json`, `.cache/`) are
  git-ignored; only `public/locales/*.json` is committed/shipped.
