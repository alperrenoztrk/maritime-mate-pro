#!/usr/bin/env node
/** Validate new applications across *all* curriculum identifiers and assets. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { professionalCaseStudies } from "../src/data/professionalCaseStudies.ts";
import { createServer } from "vite";

const inventory = JSON.parse(fs.readFileSync("docs/learning/content-audit.json", "utf8"));
const byId = new Map(inventory.topics.map(t => [t.id, t]));
const ids = Object.keys(professionalCaseStudies);
assert.equal(new Set(ids).size, ids.length, "duplicate case IDs");
assert(ids.length >= 212, "authored cases unexpectedly shrank");
const caseProblems = Object.values(professionalCaseStudies).map(s => s.example?.problem);
assert.equal(new Set(caseProblems).size, caseProblems.length, "duplicate worked scenarios across lessons");
const seenCourses = new Set();
for (const [id, section] of Object.entries(professionalCaseStudies)) {
  const meta = byId.get(id);
  assert(meta, id + ": no corresponding canonical curriculum topic");
  seenCourses.add(meta.course);
  assert.equal(section.id, id + "-professional-application");
  assert(section.content.length >= 140, id + ": explanation is too short");
  assert(section.content.includes("Common error:"), id + ": missing misconception");
  assert(section.example?.problem?.length > 30, id + ": missing scenario");
  assert((section.example?.steps?.length ?? 0) >= 3, id + ": needs at least three topic-specific reasoning steps");
  assert(section.example?.result?.length >= 30, id + ": needs qualified conclusion");
  assert(section.references?.length, id + ": missing references");
  for (const ref of section.references) {
    assert.equal(new URL(ref.url).protocol, "https:");
    assert(ref.title);
  }
  if (section.image) {
    assert(section.imageAlt, id + ": missing alt text");
    const file = path.join("public",section.image.replace(/^\//, ""));
    assert(fs.existsSync(file), id + ": illustration does not exist: " + file);
    const svg = fs.readFileSync(file, "utf8");
    assert.match(svg, /<title/);
    assert.match(svg, /<desc/);
    assert.match(svg, /viewBox=/);
  }
}
assert.equal(seenCourses.size, 25, "all 25 curriculum categories must be represented");

const server = await createServer({
  configFile: false, logLevel: "error", server: { middlewareMode: true },
  resolve: { alias: { "@": path.resolve("src") } }
});
try {
  const { getBetaTopic } = await server.ssrLoadModule("/src/data/betaLessons.ts");
  for (const id of ids) {
    const meta = byId.get(id);
    const topic = getBetaTopic(meta.course, id);
    assert(topic, id + ": missing from reader");
    assert.equal(topic.sections.filter(s => s.id === professionalCaseStudies[id].id).length, 1, id + ": case missing/duplicated in reader");
  }
} finally {
  await server.close();
}
console.log("Professional applications linked and verified:", ids.length, "in", seenCourses.size, "courses.");
