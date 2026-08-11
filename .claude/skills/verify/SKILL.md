---
name: verify
description: Build, launch and drive the Mariner's Book React app to verify changes end-to-end.
---

# Verifying changes in this repo

React 18 + Vite + Capacitor mobile-first web app (Turkish UI). No test suite that exercises the UI; verify by driving the app in a browser.

## Build & launch

```bash
npm ci                      # if node_modules missing (vite not found)
npm run typecheck           # tsc -p tsconfig.app.json --noEmit
                            # NOT `npx tsc --noEmit`: the root tsconfig.json is a
                            # solution file with "files": [], so it checks nothing.
npm run build               # vite build; PWA "globbing" warning at the end is pre-existing noise
npm run dev -- --host 127.0.0.1 --port 5183   # dev server, ready in ~1s
```

## Drive (Playwright)

Global playwright lives at `/opt/node22/lib/node_modules/playwright/index.mjs`; launch chromium with `executablePath: '/opt/pw-browsers/chromium'`. Use a mobile viewport (390×844).

Gotchas:
- The splash screen (static HTML in `index.html`) plays ~4.9s on every full page load before the app is interactive. `waitForTimeout(6000)` after `goto`.
- An in-app auto-translation layer (`RouteTranslationGate`) rewrites visible text AND aria-labels to English in the test browser regardless of `locale: 'tr-TR'`. **Select by `href`, CSS class, or DOM structure — never by Turkish text or aria-label.** (e.g. the global back pill is `div.fixed.left-3 button`.)
- External fetches (weather, news, Supabase) fail in the sandbox with ERR_CONNECTION_RESET — harmless noise, filter it from console output.
- Homepage is a 3-page horizontal snap pager (news / home / widgets); it starts centered on "home".

## Flows worth driving

- Home center page: book widget (`button[aria-label="Kitabı aç — İçindekiler"]`) → `/book`; Beta + Ayarlar tiles.
- `/book`: 7 `.bk-sheet` TOC pages, chevrons `button[aria-label="Sonraki sayfa"]`/`"Önceki sayfa"`, entries `a.bk-entry[href=...]`, chapter headings `a.bk-chapter[href=...]`.
- Hierarchical back (`useNavigationHierarchy`): `page.goBack()` follows the logical parent chain, e.g. `/lessons/stability/topics → /lessons → /book → /`.
- Glossary deep link: `/glossary?cat=Seyir` pre-selects the category chip.
