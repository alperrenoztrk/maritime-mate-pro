# Live account progress deployment

On 24 October 2026, the learning progress migration was applied transactionally to the existing Lovable Cloud database for project `50250357-50a7-4f9d-8353-23b653380abc`. The project's configuration at commit `b805696c36e424f3721158f1d1b13d8adaababf9` identifies the app's database as `vrpbhguztsqakvjcezeb`.

The separately connected Supabase project named MARINER'S BOOK (`dhjvxtwflntmvbzkqsjn`) is a different database and was not changed.

Preflight found that the existing MFA helper had moved from `public` to `private` in migration `20260810113522`. The pending learning migration and local PostgreSQL test fixture now use that actual schema. The local test replays the helper definition and schema move before testing the new table; the earlier fixture stopped before the move and therefore missed the incompatibility.

Deployment created `public.learning_progress` and the security-invoker `public.merge_learning_progress(jsonb)` RPC, recorded migration `20261022062705`, and requested a PostgREST schema-cache reload in one transaction. No existing user records were edited or imported.

Read-only live verification confirmed:

- Table exists and row-level security is enabled.
- SELECT, INSERT and UPDATE are restricted to the authenticated owner's ID.
- The restrictive MFA policy calls `private.has_sufficient_aal()`.
- Anonymous users cannot read the table or execute the merge RPC.
- Authenticated users have RPC permission, subject to owner and MFA policies.
- The merge function is security invoker, and migration history contains the deployment.

Local PostgreSQL tests exercise owner isolation, insufficient/sufficient MFA, anonymous denial, independent field merging, stale writes, unread tombstones, malformed payloads and user deletion cascade. Live checks inspected schema and privileges; they did not create a test user or read users' learning data. A real signed-in two-device session is still a useful release acceptance check.
