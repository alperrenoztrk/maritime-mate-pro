/** Local-only UI regression test. All account/backend data is synthetic. */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer } from "vite";
import { chromium } from "playwright";

process.env.VITE_SUPABASE_URL = "https://example.supabase.co";
process.env.VITE_SUPABASE_PUBLISHABLE_KEY = "public-test-key";
process.env.VITE_PRO_GATING_ENABLED = "false";
const root = process.cwd();
const server = await createServer({ root, cacheDir: fs.mkdtempSync(path.join(os.tmpdir(), "curriculum-vite-")), server: { host: "127.0.0.1", port: 0 } });
await server.listen();
const address = server.httpServer.address();
const base = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}), args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const output = process.env.LEARNING_SCREENSHOT_DIR ?? "tmp/learning-ui";
fs.mkdirSync(output, { recursive: true });
const pageErrors = [];
const user = { id: "00000000-0000-4000-8000-000000000001", aud: "authenticated", role: "authenticated", email: "curriculum-test@example.invalid", app_metadata: { provider: "email", providers: ["email"] }, user_metadata: {}, created_at: "2026-10-21T00:00:00Z" };
const exp = Math.floor(Date.now() / 1000) + 3600;
const token = [Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url"), Buffer.from(JSON.stringify({ sub: user.id, aud: "authenticated", role: "authenticated", exp, aal: "aal1" })).toString("base64url"), Buffer.from("local-test").toString("base64url")].join(".");
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
page.on("pageerror", (error) => pageErrors.push(error.message));
await page.addInitScript(({ user, token, exp }) => {
  localStorage.setItem("sb-example-auth-token", JSON.stringify({ access_token: token, refresh_token: "local-test", token_type: "bearer", expires_in: 3600, expires_at: exp, user }));
}, { user, token, exp });
await page.route("https://example.supabase.co/**", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(route.request().url().includes("/auth/v1/user") ? user : []) }));
await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ current: { temperature_2m: 18, wind_speed_10m: 5, wind_direction_10m: 90, weather_code: 0 }, daily: { sunrise: ["2026-10-21T07:00"], sunset: ["2026-10-21T18:00"] } }) }));
await page.route("https://api.bigdatacloud.net/**", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ city: "Test port", countryName: "Test" }) }));
const goto = async (route) => {
  await page.goto(base + route);
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 45000 });
  await page.locator("#splash-root").waitFor({ state: "detached", timeout: 20000 });
  await page.waitForTimeout(500);
};
const noOverflow = async () => assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow: ${page.url()}`);
try {
  await goto("/lessons");
  assert(await page.locator('a[href="/lessons/map"]').count() > 0, "Learning map is not discoverable from lessons");
  await page.locator('a[href="/lessons/map"]').click();
  await page.locator('input[placeholder="Find a course or topic…"]').waitFor();
  await noOverflow();
  await page.screenshot({ path: path.join(output, "learning-map-mobile.png"), fullPage: true });
  await page.getByRole("button", { name: "Engine learning sequence", exact: true }).click();
  await page.locator('ol a[href="/machine/thermodynamics/topics"]').waitFor({ state: "visible" });
  const search = page.locator('input[placeholder="Find a course or topic…"]');
  await search.fill("Appraisal");
  await page.locator('a[href*="navigation-appraisal"]').waitFor({ state: "visible" });
  await page.locator('a[href*="navigation-appraisal"]').click();
  await page.locator('nav[aria-label="Learning location"]').waitFor();
  assert((await page.locator('nav[aria-label="Learning location"]').innerText()).toLowerCase().includes("passage"), "Appraisal has the wrong parent module");
  await page.getByRole("button", { name: "Mark as reviewed", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Mark as unread", exact: true }).waitFor();
  await page.locator("#splash-root").waitFor({ state: "detached" });
  await noOverflow();
  await page.screenshot({ path: path.join(output, "topic-mobile.png"), fullPage: true });
  await page.locator('a[href*="?module=navigation-passage-planning"]').click();
  await page.locator('button[aria-controls="module-navigation-passage-planning"][aria-expanded="true"]').waitFor();
  assert(await page.locator('#module-navigation-passage-planning a[href*="navigation-appraisal"]').isVisible(), "Module deep link did not expand its topics");
  await goto("/lessons/stability/topics");
  assert(await page.locator('a[href="/lessons/stability/reference"]').isVisible(), "Legacy reference was removed");
  assert(await page.locator('a[href="/lessons/map"]').isVisible(), "Stability still bypasses the shared curriculum");
  await goto("/exercises/navigation/topics/navigation-appraisal");
  assert(!((await page.locator('body').innerText()).toLowerCase().includes("short blast")), "Unrelated whistle question assigned to Appraisal");
  await goto("/exercises/navigation/topics/navigation-appraisal/learn");
  let answers = 0;
  for (let step = 0; step < 40; step++) {
    if (await page.getByText("Session Completed!", { exact: true }).isVisible()) break;
    const options = page.locator('button').filter({ has: page.locator('span.text-sm.text-foreground') });
    if (await options.count()) {
      await options.first().click();
      answers++;
    }
    const advance = page.getByRole("button", { name: /^(Got it, continue\.|Continue|Finish|See Result)$/ }).last();
    await advance.click();
    await page.waitForTimeout(60);
  }
  assert(answers > 0, "Guided session did not ask questions");
  assert(await page.getByText("Session Completed!", { exact: true }).isVisible(), "Guided session did not finish");
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("mariners-book.learning-progress.v1") ?? "{}"));
  assert(stored["navigation-appraisal"]?.practice?.total > 0, "Practice result was not saved");
  await goto("/lessons/map");
  await page.setViewportSize({ width: 1280, height: 900 });
  await noOverflow();
  await page.screenshot({ path: path.join(output, "learning-map-desktop.png"), fullPage: true });
  assert.deepEqual(pageErrors, [], "Browser runtime errors");
  console.log("Learning UI OK: mobile/desktop map, reading paths, search, correct hierarchy, persistent review, module deep links, legacy reference and completed guided practice.");
} catch (error) {
  await page.screenshot({ path: path.join(output, "failure.png"), fullPage: true });
  console.error((await page.locator("body").innerText()).slice(0,3500));
  throw error;
} finally {
  await browser.close();
  await server.close();
}
