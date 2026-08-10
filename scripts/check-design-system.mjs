#!/usr/bin/env node
/**
 * Guards the Maritime iOS design system against the regressions that
 * originally motivated it. Follows the same shape as
 * scripts/check-ux-consistency.mjs: collect failures, print, exit 1.
 *
 * Every rule here corresponds to a defect that actually shipped, not to a
 * style preference.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
};
const sourceFiles = walk(path.join(root, "src"));
const rel = (file) => path.relative(root, file);

// ── 1. iOS safe areas ────────────────────────────────────────────────
// Without viewport-fit=cover, env(safe-area-inset-*) reports 0 on iOS and
// every safe-area calculation in the app silently does nothing.
const html = read("index.html");
assert(
  /<meta[^>]+name=["']viewport["'][^>]+viewport-fit=cover/.test(html),
  "index.html: the viewport meta must include viewport-fit=cover, or all env(safe-area-inset-*) values collapse to 0 on iOS",
);
assert(
  /<meta[^>]+name=["']theme-color["']/.test(html),
  "index.html: a theme-color meta is required so the browser/status bar matches the shell",
);

// ── 2. One shell colour ──────────────────────────────────────────────
// index.html, the native status bar and the PWA manifest all describe the
// same surface; they drifted to three different colours once before.
const SHELL_COLOR = "#031226";
const themeColor = html.match(/<meta[^>]+name=["']theme-color["'][^>]+content=["']([^"']+)["']/);
assert(
  themeColor && themeColor[1].toLowerCase() === SHELL_COLOR,
  `index.html: theme-color must be ${SHELL_COLOR} (the top stop of the shell gradient)`,
);
const capacitor = read("capacitor.config.ts");
assert(
  capacitor.toLowerCase().includes(`backgroundcolor: '${SHELL_COLOR}'`),
  `capacitor.config.ts: StatusBar.backgroundColor must be ${SHELL_COLOR} to match the shell`,
);
const vite = read("vite.config.ts");
assert(
  vite.toLowerCase().includes(`theme_color: "${SHELL_COLOR}"`),
  `vite.config.ts: manifest theme_color must be ${SHELL_COLOR} to match the shell`,
);

// ── 3. Route transitions ─────────────────────────────────────────────
// AnimatePresence only tracks its DIRECT children by key. The direct child is
// now a motion frame, and sync mode is deliberate: outgoing and incoming
// screens must move together rather than adding two serial 300ms waits.
const app = read("src/App.tsx");
const presence = app.match(/<AnimatePresence[^>]*mode=["']sync["'][^>]*>\s*<motion\.div([^>]*)>/);
assert(
  presence && /\bkey=/.test(presence[1]),
  "src/App.tsx: sync AnimatePresence's direct motion child must carry the route key, otherwise the simultaneous push/pop breaks",
);
assert(
  app.includes("<AppTabBar />") && app.includes('path="/library"'),
  "src/App.tsx: the persistent tab bar and its discoverable /library destination must remain mounted",
);

// ── 4. Motion tokens ─────────────────────────────────────────────────
// useFrameRate wrote a 120Hz frame budget into --animation-duration /
// --transition-duration, i.e. 8ms "animations". The hook is gone; nothing
// should reintroduce those variables.
for (const file of sourceFiles) {
  const body = fs.readFileSync(file, "utf8");
  assert(
    !/--animation-duration|--transition-duration|useFrameRate/.test(body),
    `${rel(file)}: reintroduces the frame-rate duration hack; use the motion tokens in src/styles/tokens.css instead`,
  );
}

// ── 5. Glass belongs to chrome ───────────────────────────────────────
// backdrop-filter used to be applied to every content card by a global patch
// in index.css, plus the outline button variant and the cloud-card badges.
// Those systemic sources are fixed; blur is now the exclusive property of
// .surface-glass, used by floating chrome.
//
// 63 pages still carry their own inline backdrop-blur. Migrating them is
// per-page work (Phase 2), so this is a RATCHET rather than a clean rule:
// the baseline file lists today's offenders, and the check fails only when a
// file that was clean starts using blur. Shrink glass-baseline.txt as pages
// are migrated; never add to it.
const glassBaseline = new Set(
  read("scripts/glass-baseline.txt").split("\n").map((line) => line.trim()).filter(Boolean),
);
const GLASS_ALLOWED = new Set([
  "src/components/AppNavBar.tsx",
  "src/components/AppTabBar.tsx",
  "src/components/EdgeSwipeBack.tsx",
]);
const newGlass = [];
for (const file of sourceFiles) {
  const relative = rel(file);
  if (GLASS_ALLOWED.has(relative) || glassBaseline.has(relative)) continue;
  if (/backdrop-blur|backdropFilter|backdrop-filter/.test(fs.readFileSync(file, "utf8"))) {
    newGlass.push(relative);
  }
}
assert(
  newGlass.length === 0,
  `blur is reserved for floating chrome (.surface-glass); use a --surface-* token instead in: ${newGlass.join(", ")}`,
);
// Keep the baseline honest: a migrated file must be removed from the list.
const staleBaseline = [...glassBaseline].filter(
  (relative) =>
    !fs.existsSync(path.join(root, relative)) ||
    !/backdrop-blur|backdropFilter|backdrop-filter/.test(read(relative)),
);
assert(
  staleBaseline.length === 0,
  `scripts/glass-baseline.txt lists files that no longer use blur — delete these lines: ${staleBaseline.join(", ")}`,
);

// ── 6. Text that ignores the user's size setting ─────────────────────
// Hard-coded px text does not scale with --font-scale, so the Settings
// text-size control silently did nothing for ~207 labels. Sizes below 12px
// were also under the ~11pt floor iOS treats as a legibility minimum; those
// are the ones this rule forbids outright.
for (const file of sourceFiles) {
  const body = fs.readFileSync(file, "utf8");
  for (const [, size] of body.matchAll(/text-\[(\d+)px\]/g)) {
    assert(
      Number(size) >= 12,
      `${rel(file)}: text-[${size}px] is below the legibility floor and frozen against the user's text-size setting; use text-micro or text-caption`,
    );
  }
}

// ── 7. One wave implementation ───────────────────────────────────────
// The drifting waves existed as three identical copies with three keyframe
// names, two of which animated where nobody could see them.
const waveOwners = sourceFiles.filter((file) =>
  /animation:\s*["'`]?maritime-drift|mg-drift|ml-drift|home-drift/.test(fs.readFileSync(file, "utf8")),
);
assert(
  waveOwners.length === 1 && rel(waveOwners[0]) === "src/components/MaritimeWaves.tsx",
  `the ocean waves must live only in src/components/MaritimeWaves.tsx (found: ${waveOwners.map(rel).join(", ") || "none"})`,
);

// ── 8. One back action ───────────────────────────────────────────────
// The floating control, the edge swipe and the hardware button must agree.
for (const file of ["src/components/AppNavBar.tsx", "src/components/EdgeSwipeBack.tsx"]) {
  assert(
    read(file).includes("useBackNavigation"),
    `${file}: back must go through useBackNavigation so every affordance lands in the same place`,
  );
}

// ── 9. Appearance + interactive navigation ─────────────────────────
const theme = read("src/hooks/useTheme.tsx");
for (const appearance of ['"system"', '"light"', '"dark"']) {
  assert(theme.includes(appearance), `src/hooks/useTheme.tsx: missing ${appearance} appearance`);
}
assert(
  read("src/components/EdgeSwipeBack.tsx").includes("moveSurface(next)"),
  "EdgeSwipeBack: the page itself must track the finger; an icon-only gesture is not interactive navigation",
);
for (const file of [
  "src/components/GlobalSearch.tsx",
  "src/components/library/LibraryInterface.tsx",
  "src/pages/Index.tsx",
]) {
  assert(
    !/backdrop-blur|backdropFilter|backdrop-filter/.test(read(file)),
    `${file}: content surfaces must remain blur-free; glass is navigation chrome only`,
  );
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Design system checks passed: ${sourceFiles.length} source files, safe areas + simultaneous route frame + tab navigation + appearance + interactive swipe + glass policy verified.`,
);
