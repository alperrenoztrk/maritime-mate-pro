# Enforce Pro entitlement on advertised features

## Problem
`src/pages/ProPage.tsx` sells Pro Monthly/Yearly/Lifetime advertising:
- All books & professional content
- Advanced calculations & simulations
- All quizzes & exam-prep modules
- 3D ship systems
- Ad-free use
- Higher AI monthly quota

Only the **AI quota** is actually enforced (`supabase/functions/_shared/entitlements.ts::quotaForTier`). `ProGate` (`src/components/pro/ProGate.tsx`) exists but is imported nowhere. Paying users get the same app as free users → refund/chargeback risk.

## Decisions needed from user (before build)
1. **Free tier scope** — which books/calculations/quizzes stay free as a taste? Proposal:
   - Free: Volume I (Seyir) fully; first quiz per topic; basic calculators (compass, distance, ETA).
   - Pro: Volumes II–VI, 3D ship systems, advanced calculators (celestial, stability, weather routing), all quizzes beyond #1, ad-free.
2. **Lock UX** — full block with upsell screen, or preview + blurred content + "Pro'ya geç" CTA?
3. **Ads** — no ad SDK is currently integrated. Drop "ad-free" from PRO_FEATURES, or add ads to free tier now?

## Implementation (after decisions)
1. **Central config** `src/config/proFeatures.ts`: map of `featureKey → { freeAllowlist }` so gating rules live in one place.
2. **Wrap routes/entry points** with `<ProGate feature="...">`:
   - `src/pages/BookReader.tsx` (or wherever volumes render) — check volume id vs free allowlist.
   - `src/pages/ShipSystems3D.tsx` — gate entire route.
   - `src/pages/Calculations/*` — gate the "advanced" set per config.
   - `src/pages/Quizzes/*` — allow first quiz per topic, gate rest.
3. **Upsell fallback**: shared `ProLockedCard` with feature name, benefits, and "Pro'ya geç" → `/pro`.
4. **PRO_FEATURES copy** in `ProPage.tsx`: remove/adjust bullets that can't be enforced (e.g. "Reklamsız" if no ads exist).
5. **Server-side defense**: for anything hitting edge functions (AI chat already done), also check `tier` in `verify-purchase`-derived `user_entitlements` before returning premium payloads (e.g. an eventual `advanced-calc` function). Client gates alone are bypassable.
6. **QA**: sign in as free user → advertised Pro items show lock; sign in as Pro (`tier='pro'`) → unlocked. Verify offline `fromCache` path still unlocks last-known Pro users.

## Files touched (estimate)
- `src/config/proFeatures.ts` (new)
- `src/components/pro/ProLockedCard.tsx` (new)
- Route files above (~6–10 edits)
- `src/pages/ProPage.tsx` (copy tweak)

## Out of scope
- Adding an ad SDK.
- Changing pricing tiers or Play Store SKUs.
