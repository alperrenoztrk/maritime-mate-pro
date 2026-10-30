/**
 * Every route of the Tools tab must be reachable from the Tools menu
 * (/calculations) by following links in the pages. The graph is read from the
 * source: App.tsx routes → page component → its local imports → link strings.
 *
 * PENDING lists routes of modules that have not been migrated yet; it may only
 * shrink. A route listed here that has become reachable fails the test too, so
 * the list stays accurate.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { appTabForPath } from "./appNavigation";

const PENDING = new Set([
  "/meteorology/formulas",
  "/meteorology/assistant",
  "/meteorology/quiz",
  "/engine",
  "/hydrodynamics",
  "/structural",
  "/special-ships",
  "/emissions",
  "/environment/formulas",
  "/environment/assistant",
  "/environment/quiz",
  "/solas/regulations",
  "/solas/certificates",
  "/solas/ship-requirements",
  "/solas/safety-equipment",
  "/seamanship/assistant",
  "/seamanship/quiz",
  "/safety/formulas",
  "/safety/assistant",
  "/safety/quiz",
  "/machine/assistant",
  "/machine/quiz",
  "/machine/:topicSlug/assistant",
  "/navigation/buoyage",
  "/navigation/sound-signals",
  "/navigation/meteorology",
  "/navigation/assistant",
  "/navigation/quiz",
  "/machine-calculations",
  "/stability/assistant",
  "/stability/quiz",
]);

const ROOT = path.resolve(import.meta.dirname, "../..");
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), "utf8");

function resolveImport(from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = path.join("src", spec.slice(2));
  else if (spec.startsWith(".")) base = path.join(path.dirname(from), spec);
  else return null;
  for (const ext of ["", ".tsx", ".ts", "/index.tsx", "/index.ts"]) {
    const candidate = base + ext;
    const full = path.join(ROOT, candidate);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return candidate;
  }
  return null;
}

// Global chrome and indexes are not page links.
const SKIP = /src\/(lib\/appSearch|data\/searchIndex|data\/deepSearchIndex|lib\/notesStorage|utils\/routeManifest|components\/GlobalSearch|components\/AppNavBar|components\/AppTabBar|hooks\/useNavigationHierarchy)/;

test("every Tools route is reachable from the Tools menu", () => {
  const app = read("src/App.tsx");
  const components: Record<string, string> = {};
  for (const m of app.matchAll(/const (\w+) = lazyWithReload\(\(\) =>\s*import\("(\.\/[^"]+)"\)/g)) {
    const file = resolveImport("src/App.tsx", m[2]);
    if (file) components[m[1]] = file;
  }
  const routeFiles = new Set(Object.values(components));
  const routes: Array<{ path: string; file?: string; redirect?: string }> = [];
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{([\s\S]*?)\}\s*\/>/g)) {
    if (m[1] === "*") continue;
    const names = [...m[2].matchAll(/<(\w+)/g)].map((x) => x[1]).filter((n) => components[n]);
    const nav = m[2].match(/<Navigate to="([^"]+)"/);
    routes.push({ path: m[1], file: names.length ? components[names[names.length - 1]] : undefined, redirect: nav?.[1] });
  }
  const pattern = (p: string) => new RegExp(`^${p.replace(/\./g, "\\.").replace(/:[^/]+/g, "[^/]+")}$`);
  const routeOf = (url: string) => {
    const clean = url.split(/[?#]/)[0].replace(/\/$/, "") || "/";
    return routes.find((r) => pattern(r.path).test(clean));
  };

  const closureCache = new Map<string, string[]>();
  const urlsOf = (file: string) => {
    if (!closureCache.has(file)) {
      const seen = new Set([file]);
      const stack = [file];
      while (stack.length) {
        const current = stack.pop()!;
        for (const m of read(current).matchAll(/(?:import|from)\s*\(?\s*["']([^"']+)["']/g)) {
          const dep = resolveImport(current, m[1]);
          if (!dep || SKIP.test(dep) || (routeFiles.has(dep) && dep !== file) || seen.has(dep)) continue;
          seen.add(dep);
          stack.push(dep);
        }
      }
      const urls: string[] = [];
      for (const f of seen) {
        const src = read(f);
        for (const m of src.matchAll(/["'](\/[a-z][a-zA-Z0-9\-/?=#]*)["']/g)) urls.push(m[1]);
        for (const m of src.matchAll(/`(\/[^`]*)`/g)) urls.push(m[1].replace(/\$\{[^}]+\}/g, "x"));
      }
      closureCache.set(file, urls);
    }
    return closureCache.get(file)!;
  };

  const reached = new Set<string>();
  const queue = ["/calculations"];
  while (queue.length) {
    const route = routeOf(queue.shift()!);
    if (!route || reached.has(route.path)) continue;
    reached.add(route.path);
    if (route.redirect?.startsWith("/")) queue.push(route.redirect);
    if (route.file) queue.push(...urlsOf(route.file));
  }

  const toolRoutes = routes.filter((r) => !r.redirect && !r.path.includes(":categoryId") && appTabForPath(r.path.replace(/:[^/]+/g, "x")) === "tools");
  const unreachable = toolRoutes.filter((r) => !reached.has(r.path) && !PENDING.has(r.path)).map((r) => r.path);
  const stalePending = [...PENDING].filter((p) => reached.has(p));
  assert.deepEqual(unreachable, [], "Tools routes not reachable from the Tools menu");
  assert.deepEqual(stalePending, [], "Remove these from PENDING: they are reachable now");
});
