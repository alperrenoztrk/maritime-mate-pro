import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  createBackNavigationGuard,
  findParentPath,
  hasExplicitParentPath,
} from "../src/lib/navigationHierarchy";

const appSource = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
const routePatterns = Array.from(
  appSource.matchAll(/<Route\s+path="([^"]+)"/g),
  (match) => match[1],
);

const sampleValue: Record<string, string> = {
  categoryId: "navigation",
  dept: "deck",
  deviceId: "radar",
  id: "sample",
  opIndex: "0",
  roleSlug: "chief-officer",
  sectionId: "bridge",
  shipType: "bulk-carrier",
  subTopicTitle: "radar",
  taskIndex: "0",
  taskSlug: "arrival",
  tool: "draft-survey",
  topicIndex: "0",
  topicKey: "navigation",
  topicSlug: "diesel-engines",
  topicTitle: "Radar%20ve%20ARPA",
};

const materializeRoute = (route: string): string =>
  route.replace(/:([A-Za-z0-9_]+)/g, (_match, parameter: string) =>
    sampleValue[parameter] ?? "sample",
  );

const uncovered = routePatterns
  .filter((route) => route !== "/" && route !== "*")
  .map(materializeRoute)
  .filter((route) => !hasExplicitParentPath(route));

assert.deepEqual(
  uncovered,
  [],
  `App.tsx içinde açık ebeveyn kuralı olmayan rotalar: ${uncovered.join(", ")}`,
);

const expectedParents: Array<[string, string]> = [
  ["/lessons/navigation/topics/Radar%20ve%20ARPA", "/lessons/navigation/topics"],
  ["/lessons/navigation/formulas", "/lessons"],
  ["/exercises/navigation/topics/Radar%20ve%20ARPA/learn", "/exercises/navigation/topics"],
  ["/exercises/navigation/topics/Radar%20ve%20ARPA", "/exercises/navigation/topics"],
  ["/exercises/navigation/scenarios", "/exercises/navigation/topics"],
  ["/exercises/navigation/topics", "/exercises"],
  ["/crew/chief-officer/task/0", "/crew/chief-officer"],
  ["/ship-systems/bridge/0", "/ship-systems/bridge"],
  ["/ship-operations/bulk-carrier/deck/0", "/ship-operations/bulk-carrier"],
  ["/machine/diesel-engines/topics/fuel-system", "/machine/diesel-engines/topics"],
  ["/stability/formulas/gm", "/stability/formulas"],
  ["/stability/practical/tank", "/stability/practical"],
  ["/cargo/calculations/draft-survey", "/cargo/calculations"],
  ["/seamanship/calculations/mooring", "/seamanship/calculations"],
  ["/navigation/calc/great-circle", "/navigation"],
  ["/economics/assistant", "/economics"],
  ["/auth/callback", "/auth"],
];

for (const [route, expectedParent] of expectedParents) {
  assert.equal(
    findParentPath(route),
    expectedParent,
    `${route} tek basışta yalnız ${expectedParent} rotasına dönmeli`,
  );
}

const guard = createBackNavigationGuard(450);
assert.equal(guard.claim(1_000), true, "İlk geri eylemi kabul edilmeli");
assert.equal(guard.claim(1_100), false, "Aynı fiziksel eylemin tekrarı yutulmalı");
assert.equal(guard.claim(1_451), true, "Yeni ve kasıtlı geri eylemi kabul edilmeli");

console.log(
  `Navigation hierarchy OK: ${routePatterns.length} route patterns, ${expectedParents.length} deep-route assertions, shared back guard verified.`,
);

