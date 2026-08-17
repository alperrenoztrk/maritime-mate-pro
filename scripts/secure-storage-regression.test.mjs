import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(
  path.join(root, "src/lib/secureSessionStorage.ts"),
  "utf8",
);

test("keeps the SecureStorage proxy boxed across Promise resolution", async () => {
  let thenReads = 0;
  const plugin = new Proxy(
    {},
    {
      get(_target, property) {
        if (property === "then") thenReads += 1;
        return undefined;
      },
    },
  );

  const box = await Promise.resolve({ storage: plugin });

  assert.equal(box.storage, plugin);
  assert.equal(thenReads, 0);
});

test("native storage loader never returns the plugin proxy unboxed", () => {
  assert.match(source, /const loadPlugin = async \(\): Promise<PluginBox>/);
  assert.doesNotMatch(source, /return\s+box\.storage/);

  const boxedConsumers = source.match(
    /const \{ storage: plugin \} = await loadPlugin\(\);/g,
  );
  assert.equal(boxedConsumers?.length, 3);
});
