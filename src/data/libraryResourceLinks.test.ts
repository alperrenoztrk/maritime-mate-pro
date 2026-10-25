import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { categoryHref, STATIC_SECTIONS } from "./libraryResourceLinks";

const routes = [...readFileSync(new URL("../App.tsx", import.meta.url), "utf8").matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
const matches = (to: string) =>
  routes.some((r) => new RegExp(`^${r.replace(/:[^/]+/g, "[^/]+").replace("*", ".*")}$`).test(to));

describe("library resources", () => {
  const deckKeys = [...readFileSync(new URL("./betaLessons.ts", import.meta.url), "utf8").matchAll(/^ {2}"([a-z-]+)",$/gm)].map((m) => m[1]);
  const items = [
    ...STATIC_SECTIONS.flatMap((s) => s.items),
    ...[...deckKeys, "machine-engine-room-safety"].map((k) => ({ title: k, to: categoryHref(k) })),
  ];
  it("every Library card points to a real route", () => {
    for (const item of items) assert.ok(matches(item.to), `${item.title} -> ${item.to}`);
  });
  it("includes the resources testers used", () => {
    const paths = items.map((i) => i.to);
    for (const p of ["/exercises", "/glossary", "/beta/psc-checklist", "/seamanship/knots", "/lessons/stability/topics"]) assert.ok(paths.includes(p), p);
    assert.ok(paths.some((p) => p.startsWith("/machine/")), "engine library");
  });
});
