import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const pages = walk("src/pages").filter((file) => file.endsWith(".tsx"));
for (const file of pages) {
  const source = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(source, /calculation-grid/, `${file}: retired grid`);
  if (!file.endsWith("BetaShipSimulator.tsx")) assert.doesNotMatch(source, /blur-3xl/, `${file}: duplicate glow backdrop`);
  assert.doesNotMatch(source, /<h1[^>]*bg-clip-text/, `${file}: gradient hero title`);
}
assert.ok(!fs.existsSync("src/pages/EmptyPage.tsx"));
assert.ok(!fs.existsSync("src/components/ui/calculation-grid.tsx"));
for (const name of ["Cargo", "Economics", "Environment", "FluidMechanics", "Safety", "Seamanship", "Stability"]) {
  const source = fs.readFileSync(`src/pages/${name}TopicsPage.tsx`, "utf8");
  // Article dialogs retain scrolling; page indexes use document scroll.
  assert.doesNotMatch(source, /<ScrollArea[^>]*h-\[calc\(100vh/, `${name}: fixed page scroller`);
}
assert.match(fs.readFileSync("src/App.tsx", "utf8"), /path="\/empty-page" element=\{<Navigate to="\/" replace/);
assert.doesNotMatch(fs.readFileSync("src/pages/CalculationSectionPage.tsx", "utf8"), /This section is ready|will be updated shortly/);
console.log(`Legacy-page guard passed (${pages.length} page files).`);
