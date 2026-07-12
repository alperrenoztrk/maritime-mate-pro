# Professional Book-Opening Splash Screen

Replace the current spinner splash with a cinematic "book opening" animation: a closed book appears at center, then its two covers swing open (left and right) revealing the "MARINER'S BOOK" title and a subtle gold shimmer, before fading into the app.

## Visual concept

```text
   Stage 1 (0.0–0.4s)      Stage 2 (0.4–1.1s)         Stage 3 (1.1–1.6s)
   ┌──────────┐            ┌────┐    ┌────┐           ┌───────────────┐
   │  [book]  │    →       │ ◀  │    │  ▶ │    →      │  MARINER'S    │
   │  closed  │            │cover    cover│           │    BOOK       │
   └──────────┘            └────┘    └────┘           └───────────────┘
     fade+scale             covers swing open          title + shimmer
                            (rotateY -110° / +110°)     fades to app
```

- Deep navy background matching app gradient (`#020a14` → `#0a1f3d`).
- Center: a stylized book (gold-edged pages + navy leather covers) built in pure SVG/CSS — no external assets.
- Two cover halves rotate outward with `transform-style: preserve-3d` + `rotateY` and `perspective`, revealing "pages" underneath.
- Title "MARINER'S BOOK" fades up from the open pages with the existing gold gradient shimmer.
- Total duration ~1.6s, then splash fades out (existing `.splash-hide` behavior).
- Respects `prefers-reduced-motion`: skips the 3D swing, just fades title in.

## Files to change

**`index.html`** — replace the current `#splash-root` markup (spinner + text) with:
- A `.book` stage containing `.book-spine`, `.book-cover-left`, `.book-cover-right`, `.book-pages`, and `.book-title`.
- Inline `<style>` with keyframes: `book-appear`, `cover-open-left`, `cover-open-right`, `title-reveal`, `gold-shimmer`, plus the existing `splash-hide` fade-out.
- Uses `perspective: 1200px` on the stage and `transform-origin: left/right center` on the covers so they hinge like a real book.
- Keep it dependency-free (no fonts beyond system stack; title uses letter-spacing + gold gradient like the in-app header).

**`src/main.tsx`** — small timing tweak:
- Delay `hideSplash` until ~1.7s (currently ~100ms after mount) so the animation can play through even on fast loads.
- Keep the 1200ms hard safety net logic but raise it to ~2500ms as the fallback ceiling.
- No other logic changes.

## Technical details

- Pure HTML/CSS, no JS animation library — runs before React mounts, zero bundle impact.
- 3D transforms are GPU-accelerated; total DOM is <15 nodes.
- Native iOS/Android splash (`LaunchScreen.storyboard`, `drawable/splash.png`) is **not** touched — those are static OS-level splashes shown before the WebView loads. This animated splash is the web/in-app splash that plays right after.
- Accessibility: `aria-hidden="true"` on decorative book parts; title kept as visible text with `lang="en"` and `translate="no"` (matches existing convention).
