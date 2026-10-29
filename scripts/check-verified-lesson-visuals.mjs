#!/usr/bin/env node
/** Image governance: exact subject, local source, author, license, and topic placement.
 * All omitted/unknown placements are hidden by the lesson image resolver.
 * A passing check establishes provenance/linkage, not independent visual peer review.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";

const manifest = JSON.parse(fs.readFileSync("src/data/verifiedLessonVisuals.json", "utf8"));
const choices = manifest.approved;
const keys = new Set();
for (const item of choices) {
  const id = [item.category,item.topic,item.section,item.asset].join("|");
  assert(!keys.has(id), "duplicate approved visual placement: "+id);
  keys.add(id);
  assert(item.asset.startsWith("src/assets/"),id+": unexpected location");
  assert(fs.existsSync(item.asset), id+": missing asset");
  assert(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/i.test(item.sourceUrl),id+": source is not a Commons original");
  assert(item.author && /^(public domain|cc0|cc by)/i.test(item.license),id+": author/license missing or unsupported");
}
assert(choices.length >= 50,"reviewed visual allowlist shrank unexpectedly");
const tree = fs.readdirSync("public/lessons");
assert.equal(tree.filter(name=>/^(epirb-|professional-).*\.svg$/.test(name)).length,0,"AI-authored illustrations remain in public/lessons");
const authFiles = ["src/data/shipSystems/longform/gmdss-lsa/4.ts","src/data/communicationTopicContents.ts","src/data/safetyTopicContents.ts","src/pages/SafetyTopicsPage.tsx","src/data/professionalCaseStudies.ts"];
for(const file of authFiles)assert.doesNotMatch(fs.readFileSync(file,"utf8"),/\/lessons\/(epirb-(alert-chain|float-free|display-comparison)|professional-[\w-]+)\.svg/);

const server = await createServer({configFile:false, logLevel:"error", server:{middlewareMode:true}, resolve:{alias:{"@":path.resolve("src")}}});
try {
  const {getBetaTopic} = await server.ssrLoadModule("/src/data/betaLessons.ts");
  const {resolveLessonImage, getVerifiedLessonImageCredit} = await server.ssrLoadModule("/src/utils/lessonImageFallbacks.ts");
  let verified = 0;
  for(const item of choices){
    const topic = getBetaTopic(item.category,item.topic);
    assert(topic, item.category+"/"+item.topic+": missing curriculum topic");
    const section = topic.sections.find(s => (s.sourceTitle ?? s.title)===item.section);
    assert(section,item.category+"/"+item.topic+"/"+item.section+": section not found");
    assert(section.image,item.asset+": image not assigned in section");
    const approved = resolveLessonImage(item.category,section.image,section.sourceTitle ?? section.title,topic.sourceTitle ?? topic.title,section.imageAlt);
    assert(approved,item.asset+": real asset not displayed at its approved placement");
    const credit = getVerifiedLessonImageCredit(approved,item.category,section.sourceTitle ?? section.title,topic.sourceTitle ?? topic.title);
    assert.equal(credit.sourceUrl,item.sourceUrl);
    assert.equal(resolveLessonImage(item.category,section.image,section.title,"Entirely unrelated topic",""),undefined,"image leaked into another topic");
    assert.equal(resolveLessonImage(item.category,"https://example.org/placeholder.jpg",section.title,topic.title,""),undefined,"external hotlink leaked");
    verified++;
  }
  console.log("Verified image assignments:",verified,"no unreviewed image substitutions.");
} finally {await server.close();}
