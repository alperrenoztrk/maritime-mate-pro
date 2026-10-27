import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { preview, resolveConfig } from "vite";

// Synthetic local fixture: no login and no requests to a real backend.
const config = await resolveConfig({ mode: "native" }, "serve");
const backend = new URL(JSON.parse(config.define["import.meta.env.VITE_SUPABASE_URL"]));
const storageKey = `sb-${backend.hostname.split(".")[0]}-auth-token`;
const user = { id: "00000000-0000-4000-8000-000000000001", aud: "authenticated", role: "authenticated", email: "ui-test@example.invalid", app_metadata: {}, user_metadata: {}, created_at: "2026-01-01T00:00:00Z", factors: [] };
const expires = Math.floor(Date.now() / 1000) + 3600;
const token = [{ alg: "HS256", typ: "JWT" }, { sub: user.id, exp: expires, aal: "aal1" }].map((value) => Buffer.from(JSON.stringify(value)).toString("base64url")).join(".") + ".local-test-only";
const session = { access_token: token, refresh_token: "local-test-only", token_type: "bearer", expires_in: 3600, expires_at: expires, user };
const server = await preview({ mode: "native", preview: { host: "127.0.0.1", port: 5183, strictPort: true } });
const base = "http://127.0.0.1:5183";
const output = path.resolve(process.env.UI_SCREENSHOT_DIR ?? "tmp/launch-ui");
await fs.mkdir(output, { recursive: true });
let browser;
try {
  browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, args: ["--no-sandbox", "--disable-dev-shm-usage", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  async function fixtureContext() {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1, colorScheme: "dark", serviceWorkers: "block" });
  await context.addInitScript(({ storageKey, session }) => {
    localStorage.setItem(storageKey, JSON.stringify(session));
    localStorage.setItem("preferredLanguage", "en");
    if (!localStorage.getItem("maritime-ui-theme-v2")) localStorage.setItem("maritime-ui-theme-v2", "dark");
  }, { storageKey, session });
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === base || !url.protocol.startsWith("http")) return route.continue();
    if (url.origin === backend.origin) return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(url.pathname.startsWith("/auth/") ? user : []) });
    return route.abort();
  });
  return context;
  }
  let context = await fixtureContext();
  const errors = [];
  let page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const launchTime = new Date();
  await page.clock.install({ time: launchTime });
  await page.clock.pauseAt(launchTime);
  await page.goto(base + "/cargo/calculations", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.getElementById("root")?.childElementCount > 0);
  await page.clock.runFor(1000);
  for (const viewport of [{ width: 375, height: 812 }, { width: 375, height: 900 }, { width: 812, height: 375 }]) {
    await page.setViewportSize(viewport);
    assert.ok(await page.evaluate(() => {
      const root = document.getElementById("root");
      const splash = document.getElementById("splash-root");
      const box = splash.getBoundingClientRect();
      return root.inert && root.getAttribute("aria-hidden") === "true" && getComputedStyle(root).visibility === "hidden" && box.top <= 0 && box.bottom >= innerHeight && splash.contains(document.elementFromPoint(innerWidth / 2, innerHeight - 2));
    }), "splash covers the bottom edge and isolates mounted app chrome");
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: path.join(output, "splash-mobile.png") });
  await page.locator("#splash-root").dispatchEvent("pointerdown");
  await page.clock.runFor(200);
  assert.ok(await page.evaluate(() => !document.getElementById("splash-root") && !document.documentElement.hasAttribute("data-launch-pending") && !document.getElementById("root").inert && !document.getElementById("root").hasAttribute("aria-hidden")));
  await context.close();

  // Use real timers for the app's transitions and translation budgets.
  // Playwright's clock is shared by pages in one browser context.
  context = await fixtureContext();
  page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const active = () => page.locator(`[data-route-path="${new URL(page.url()).pathname}"]:not([data-route-exiting])`);
  async function ready() {
    await page.locator("#splash-root").waitFor({ state: "detached" });
    await active().locator("h1").first().waitFor({ state: "visible" });
    await page.locator('[role="status"][aria-label="Loading translated page"]').waitFor({ state: "hidden" });
  }
  async function visit(route) { await page.goto(base + route, { waitUntil: "domcontentloaded" }); await ready(); }
  async function screenshot(name) {
    // Wait out the known route entrance before capturing its final layout.
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(output, name), fullPage: true });
  }
  await visit("/cargo/calculations");
  const expected = ["draft-survey", "preloading", "intermediate", "postdischarge", "comparative", "ballast", "density", "bunker"].map((slug) => `/cargo/calculations/${slug}`);
  assert.deepEqual(await active().locator(".ios-list-row > a").evaluateAll((links) => links.map((link) => link.getAttribute("href"))), expected);
  assert.equal(await active().locator("a a, a button").count(), 0);
  await screenshot("cargo-mobile-dark.png");
  await active().locator('a[href="/cargo/calculations/density"]').click();
  await page.waitForURL(base + "/cargo/calculations/density");
  await ready();
  await page.locator("header.app-navbar button").first().click();
  await page.waitForURL(base + "/cargo/calculations");
  await ready();
  assert.equal(await active().locator(".ios-list-row").count(), 8);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => { localStorage.setItem("maritime-ui-font-size", "large"); localStorage.setItem("maritime-ui-theme-v2", "light"); });
  await page.setViewportSize({ width: 320, height: 812 });
  await visit("/cargo/calculations");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  await screenshot("cargo-mobile-large-light.png");
  const lastTool = active().locator('a[href="/cargo/calculations/bunker"]');
  await lastTool.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
  assert.ok(await lastTool.evaluate((el) => el.getBoundingClientRect().bottom <= document.querySelector("[data-app-tabbar]").getBoundingClientRect().top));
  await page.evaluate(() => { localStorage.setItem("maritime-ui-font-size", "normal"); localStorage.setItem("maritime-ui-theme-v2", "dark"); });
  await page.setViewportSize({ width: 768, height: 1024 });
  await visit("/cargo/calculations");
  await screenshot("cargo-tablet.png");
  await visit("/navigation");
  assert.equal(await active().locator(".ios-list-row").count(), 25);
  await visit("/stability/calculations");
  assert.equal(await active().locator(".ios-list-row").count(), 6);
  const formula = active().locator("details").first();
  await formula.locator("summary").click();
  assert.equal(await formula.getAttribute("open"), "");
  assert.ok((await formula.innerText()).includes("Source:"));
  for (const [old, destination] of [["/empty-page", "/"], ["/calculations/communication/calculations?from=bookmark#reference", "/lessons/communication/calculations?from=bookmark#reference"], ["/calculations/navigation/rules", "/lessons/navigation/topics"], ["/calculations/machine-thermodynamics/formulas", "/machine/thermodynamics/formulas"], ["/calculations/unknown/formulas", "/calculations"]]) {
    await page.goto(base + old, { waitUntil: "domcontentloaded" });
    await page.waitForURL(base + destination);
    await page.locator("#splash-root").waitFor({ state: "detached" });
  }
  assert.deepEqual(errors, []);
  console.log("PASS: splash viewport/isolation/tap release; Cargo links and app back; large text and last-row access; tablet; Navigation and Stability tools; formula details; five redirects; zero runtime errors.");
} finally {
  await browser?.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
}
