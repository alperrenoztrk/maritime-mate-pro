#!/usr/bin/env node
import fs from "node:fs";

const menu = fs.readFileSync("src/pages/library/CalculationsLibraryPage.tsx", "utf8");
const app = fs.readFileSync("src/App.tsx", "utf8");
const targets = [...menu.matchAll(/\bto:\s*"([^"]+)"/g)].map((match) => match[1]);
const routes = [...app.matchAll(/\bpath="([^"]+)"/g)].map((match) => match[1]);
const failures = [];

// Tools intentionally lists only the unit converter.
if (targets.length !== 1 || targets[0] !== "/converter") {
  failures.push(`Tools must list only the unit converter (/converter); found: ${targets.join(", ") || "none"}`);
}
if (new Set(targets).size !== targets.length) failures.push("Duplicate tool routes were found.");
for (const target of targets) {
  const exists = routes.some((route) => {
    const pattern = "^" + route
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/:[A-Za-z_]\w*/g, "[^/]+") + "$";
    return new RegExp(pattern).test(target);
  });
  if (!exists) failures.push(`No App route matches tool destination: ${target}`);
}
for (const removed of [
  "/navigation/tide-tutorial",
  "/ship-systems/nav-systems",
  "/ship-systems/deck-machinery",
  "/cargo/formulas",
  "/stability/formulas",
]) {
  if (targets.includes(removed)) failures.push(`Non-calculator page remains in Tools: ${removed}`);
}
if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`Tools route checks passed: ${targets.length} unique destinations.`);
