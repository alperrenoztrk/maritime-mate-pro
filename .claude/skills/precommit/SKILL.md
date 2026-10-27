---
name: precommit
description: Run every pre-commit check from CLAUDE.md in order, report a pass/fail table, and draft the commit message with the Turkish "Terim denetimi (self-check)" list. Use only when the user runs /precommit.
disable-model-invocation: true
---

# Pre-commit checks

Run these from the repository root, one at a time, in this order. Run every
check even if an earlier one fails, so the user sees the full picture. Do not
fix anything while running them.

| # | Command | Note |
|---|---|---|
| 1 | `npm run lint` | |
| 2 | `npm run typecheck` | |
| 3 | `npm run i18n:extract` | Regenerates `scripts/i18n/source-strings.json` (not tracked); the coverage check needs it |
| 4 | `npm run test:i18n-terms` | |
| 5 | `npm run i18n:repair-en -- --check` | |
| 6 | `npm run i18n:audit-terms -- --lang=en --strict --max-errors=0` | |
| 7 | `npm run i18n:audit-terms -- --strict --max-errors=0` | |
| 8 | `npm run i18n:scan-senses -- --check` | Slow (several minutes); run it in the background if the tool times out |
| 9 | `npm run check:svg-text` | |
| 10 | `npm run check:ux-consistency` | |
| 11 | `npm run check:design-system` | |
| 12 | `npm run i18n:verify` | Includes 4–8 again plus the coverage and paragraph/learning pack checks |
| 13 | `npm run build:native` | |

If CLAUDE.md's "Commit öncesi kontroller" list differs from this table, follow
CLAUDE.md and mention the difference.

## Report

Reply in Turkish with one table: check, result (geçti / kaldı), duration, and
for a failure the first meaningful error line. Then one line: "Commit'e hazır"
or "Commit'e hazır değil" with the failing check numbers.

## Commit message (only when every check passed)

Draft the message, do not commit unless the user asks:

- Subject and body in English: what changed and why.
- Then a Turkish block titled `Terim denetimi (self-check)` that answers, for
  the actual diff:
  - Metindeki her denizcilik terimi GLOSSARY.md ile eşleşiyor mu?
  - Bir komut fiili (viya, alabanda, funda, vira, laçka, aganta, mola, fora,
    mayna, tornistan) jenerik fiile çevrildi mi?
  - Sözlükte olmayan terim var mı, `[?? TERİM: …]` ile işaretlendi mi?
  - Türkçe deyim sadeleştirilip terim niteliği bozuldu mu?
  - İskele/sancak, pruva/kıç (tornistan) yönleri karışmadı mı?
  - Sürüm yükseltildi mi? (Yalnız kullanıcı açıkça istediyse.)
- End with the attribution lines the session's instructions require.

Never print or log secrets, keystores or passwords while checking.
