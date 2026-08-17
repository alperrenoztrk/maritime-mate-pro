import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "src/main.tsx"), "utf8");

test("never replaces a successfully mounted native app with diagnostics", () => {
  assert.doesNotMatch(source, /boot:\s*reached mount/i);
  assert.doesNotMatch(source, /paintMountReached/);

  const renderCall = "createRoot(container).render(createElement(AppRoot));";
  const renderIndex = source.indexOf(renderCall);
  const mountedIndex = source.indexOf("appHasMounted = true;", renderIndex);

  assert.notEqual(renderIndex, -1, "React root render must remain present");
  assert.ok(
    mountedIndex > renderIndex,
    "the app must be marked mounted only after React accepts the root render",
  );
});

test("keeps native boot diagnostics limited to genuine failures", () => {
  assert.match(source, /paintDiagnostic\('boot: window\.onerror'/);
  assert.match(source, /paintDiagnostic\('boot: unhandled rejection'/);
  assert.match(source, /paintDiagnostic\('boot: React render failed'/);
  assert.match(source, /paintDiagnostic\('boot: bootstrap failed'/);
});
