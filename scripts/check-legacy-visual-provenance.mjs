#!/usr/bin/env node
/**
 * Older maritime routes must not bypass the exact-source image gate.
 * Metadata and source checks are necessary, not substitutes for visual
 * examination of a photo by a maritime subject specialist.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
const registry = JSON.parse(fs.readFileSync("src/data/verifiedLegacyVisuals.json","utf8"));
const approvals = registry.approved;
assert(approvals.length >= 14, "legacy visual curated set unexpectedly shrank");
const seen = new Set();
for(const p of approvals) {
  const key=[p.surface,p.topicId,p.asset].join("|");
  assert(!seen.has(key),"duplicate legacy photo assignment "+key);
  seen.add(key);
  assert(fs.existsSync(p.asset), "missing source photo "+key);
  assert(p.description.length>=30 && p.title.length>=8, "unreviewed or vague caption "+key);
  assert(p.sourceUrl.startsWith("https://commons.wikimedia.org/wiki/File:"),"missing original Commons URL "+key);
  assert(p.author && /^(CC0|CC BY|Public domain)/i.test(p.license), "credit or licence absent "+key);
}
const routes = [
  ["src/pages/SafetyTopicsPage.tsx","safety"],
  ["src/pages/CargoTopicsPage.tsx","cargo"],
  ["src/pages/SeamanshipTopicsPage.tsx","seamanship"],
];
for(const [file,name] of routes) {
  const src=fs.readFileSync(file,"utf8");
  assert.match(src,/verifiedLegacyImage/,"legacy image gate missing from "+file);
  assert.match(src,/approvedTopicImage/,"topic image not gated in "+file);
  assert.doesNotMatch(src,/src=\{currentContent\.image\}/,"raw photo path still renders in "+file);
  if(name==="seamanship"){
    assert.match(src,/approvedPhotos/);
    assert.doesNotMatch(src,/<PhotoGallery photos=\{currentContent\.photos\}/);
  }
}
const longform = fs.readFileSync("src/pages/ShipSystemDeepDive.tsx","utf8");
assert.match(longform,/verifiedLegacyImage\("ship-system"/);
assert.match(longform,/verifiedLegacyImage\("longform"/);
assert(!approvals.some(x=>x.surface==="ship-system"),"ship-system sources conflict: do not approve until credits reconciled");
const server = await createServer({configFile:false,logLevel:"error",server:{middlewareMode:true},resolve:{alias:{"@":path.resolve("src")}}});
try {
  const {verifiedLegacyImage}=await server.ssrLoadModule("/src/utils/verifiedLegacyImage.ts");
  for(const approved of approvals){
    // The source module controls Vite asset URLs. Verify the guard rejects
    // every unrelated path even when the same local image URL is reused.
    assert.equal(verifiedLegacyImage(approved.surface,"not-this-topic","/placeholder.jpg"),undefined);
    assert.equal(verifiedLegacyImage(approved.surface,approved.topicId,"https://example.org/fake.jpg"),undefined);
    assert.equal(verifiedLegacyImage(approved.surface+"-unreviewed",approved.topicId,"/placeholder.jpg"),undefined);
  }
}finally{await server.close()}
console.log("Legacy visual source and topic gate OK:",approvals.length,"approved topic-bound placements.");
