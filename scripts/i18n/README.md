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
```

Then commit the generated `public/locales/*.json`.

## Notes

- **Order of precedence per string:** curated maritime override
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
- **Delivery:** locale JSONs are excluded from the PWA precache
  (`globIgnores`) and cached on demand (`runtimeCaching`), so only the selected
  language is downloaded.
- **Regenerable intermediates** (`source-strings.json`, `.cache/`) are
  git-ignored; only `public/locales/*.json` is committed/shipped.
