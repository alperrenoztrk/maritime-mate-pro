import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { isChunkLoadError, shouldReloadFailedChunk } from "./lazyWithReload";

test("recognizes Vite/Chromium/WebKit failed page chunks, not ordinary render errors", () => {
  for (const message of [
    "Failed to fetch dynamically imported module: https://example.test/assets/Page-abc123.js",
    "Importing a module script failed.",
    "error loading dynamically imported module",
    "Loading chunk 123 failed.",
    "ChunkLoadError",
    "Failed to load module script: Expected a JavaScript module script",
    "Load failed",
  ]) {
    assert.equal(isChunkLoadError(new TypeError(message)), true, message);
  }
  for (const message of [
    "Cannot read properties of undefined (reading 'map')",
    "Minified React error #310",
    "Permission denied",
  ]) {
    assert.equal(isChunkLoadError(new Error(message)), false, message);
  }
});

test("one automatic refresh per route within five minutes; never while offline", () => {
  const at = Date.UTC(2026, 9, 26, 12, 0, 0);
  const error = new TypeError("Importing a module script failed.");
  assert.equal(shouldReloadFailedChunk(error, null, at, true), true);
  assert.equal(shouldReloadFailedChunk(error, String(at), at + 10_000, true), false);
  assert.equal(shouldReloadFailedChunk(error, String(at), at + 300_000, true), true);
  assert.equal(shouldReloadFailedChunk(error, "not-a-number", at, true), true);
  assert.equal(shouldReloadFailedChunk(error, null, at, false), false);
  assert.equal(shouldReloadFailedChunk(new Error("Component render crashed"), null, at, true), false);
});

test("all dynamically imported routes have files and are isolated by a route error boundary", () => {
  const srcDir = fileURLToPath(new URL("..", import.meta.url));
  const app = readFileSync(resolve(srcDir, "App.tsx"), "utf8");
  const importedModules = Array.from(
    app.matchAll(/\blazyWithReload\(\s*\(\)\s*=>\s*import\(["']([^"']+)["']\)/g),
    (match) => match[1],
  );

  assert.ok(importedModules.length >= 100, "expected the complete lazy route table");
  assert.equal(/\blazy\(/.test(app), false, "unprotected React.lazy route found");
  for (const specifier of importedModules) {
    assert.ok(specifier.startsWith("./"), `unexpected import: ${specifier}`);
    const target = resolve(srcDir, specifier.slice(2));
    assert.ok(
      [".tsx", ".ts", ".jsx", ".js"].some((extension) => existsSync(target + extension)),
      `missing page module: ${specifier}`,
    );
  }

  const paths = Array.from(app.matchAll(/<Route\s+path="([^"]+)"/g), (match) => match[1]);
  assert.equal(new Set(paths).size, paths.length, "duplicate route paths");
  const routeBoundary = app.indexOf("<ErrorBoundary key={`${location.pathname}${location.search}`}");
  const suspense = app.indexOf("<Suspense fallback={<RouteFallback />}>");
  const closeSuspense = app.indexOf("</Suspense>", suspense);
  const closeBoundary = app.indexOf("</ErrorBoundary>", routeBoundary);
  assert.ok(routeBoundary >= 0 && routeBoundary < suspense, "missing route-scoped error boundary");
  assert.ok(suspense < closeSuspense && closeSuspense < closeBoundary, "routes not wrapped in boundary");
});
