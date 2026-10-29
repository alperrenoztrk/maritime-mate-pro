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
let cloudProgress = {};
let rejectSync = false;
await page.route("https://example.supabase.co/**", async (route) => {
  const url = route.request().url();
  if (url.includes("/rpc/merge_learning_progress")) {
    if (rejectSync) return route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ message: "Synthetic offline service" }) });
    const incoming = route.request().postDataJSON()?.incoming ?? {};
    cloudProgress = { ...cloudProgress, ...incoming };
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(cloudProgress) });
  }
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(url.includes("/auth/v1/user") ? user : []) });
});
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
  await goto("/lessons/map");
  const next = () => page.getByRole("button", { name: "Continue", exact: true });
  const radio = (index) => page.getByRole("radio").nth(index);
  assert(await next().isDisabled());
  await radio(1).check(); await next().click();
  await radio(1).check(); await next().click();
  await radio(1).check(); await next().click();
  await radio(0).check(); await next().click();
  await noOverflow();
  await page.screenshot({path: path.join(output, "placement-question-mobile.png"), fullPage: true});
  await radio(1).check(); await next().click();
  await page.reload();
  await page.getByRole("heading", { name: "A ship floats at rest. What balances its weight?", exact: true }).waitFor();
  assert(await next().isDisabled(), "Unanswered step must require a choice");
  await page.getByRole("button", {name: "Previous", exact: true}).click();
  assert(await radio(1).isChecked(), "Previous selection was lost");
  await next().click();
  for (const answer of [2, 1, 0, 2]) { await radio(answer).check(); await next().click(); }
  await radio(3).check();
  await page.getByRole("button", {name: "Show my learning path", exact: true}).click();
  await page.getByRole("heading", { name: "Ready for deeper study", exact: true }).waitFor();
  assert((await page.locator('section[aria-labelledby="placement-path"] ol a').first().getAttribute("href")) === "/lessons/meteorology/topics");
  await page.getByText("Review my answers", {exact: true}).click();
  await page.getByText("Your answer: I don't know yet", {exact: true}).waitFor();
  await noOverflow();
  await page.screenshot({path: path.join(output, "placement-result-mobile.png"), fullPage: true});
  await page.reload();
  await page.getByRole("heading", { name: "Ready for deeper study", exact: true }).waitFor();
  await page.locator("#splash-root").waitFor({state: "detached"});
  await page.getByRole("link", { name: "Start my learning path", exact: true }).click();
  await page.waitForURL("**/lessons/meteorology/topics");
  await goto("/lessons/map");
  await page.getByRole("button", {name: "Retake placement", exact: true}).click();
  assert(await next().isDisabled());
  await radio(2).check(); await next().click();
  await radio(2).check(); await next().click();
  await radio(2).check(); await next().click();
  await radio(2).check(); await next().click();
  // Returning to change the department clears existing diagnostic responses.
  await radio(1).check(); await next().click();
  for (let i = 0; i < 4; i++) await page.getByRole("button", {name: "Previous", exact: true}).click();
  await radio(1).check(); await radio(2).check(); await next().click();
  await next().click(); await next().click();
  assert(await next().isDisabled(), "Department change retained diagnostic answers");
  for (const answer of [1, 2, 0, 2, 1]) { await radio(answer).check(); await next().click(); }
  await radio(0).check(); await page.getByRole("button", {name: "Show my learning path", exact: true}).click();
  await page.getByRole("heading", {name: "Ready for deeper study", exact: true}).waitFor();
  assert(await page.locator('a[href="/machine/engine-room-ops/topics"]').count() > 0);
  await page.setViewportSize({width: 1280, height: 900}); await noOverflow();
  await page.screenshot({path: path.join(output, "placement-result-desktop.png"), fullPage: true});
  await page.getByRole("button", {name: "Explore all subjects", exact: true}).click();
  await page.getByRole("button", {name: "Engine learning sequence", exact: true}).click();
  await page.locator('input[placeholder="Find a course or topic…"]').fill("Appraisal");
  await page.locator('a[href*="navigation-appraisal"]').waitFor({state: "visible"});
  await page.getByRole("button", {name: "My personal learning path", exact: true}).click();
  await page.getByRole("heading", {name: "Ready for deeper study", exact: true}).waitFor();
  assert.deepEqual(pageErrors, []);
  console.log("Placement UI OK: mobile/desktop, deck/engine, disabled advance, unknown answer, resume, back, branch change, persistence, retake, real course navigation and full catalogue.");
} catch (error) {
  await page.screenshot({path: path.join(output, "placement-failure.png"), fullPage: true});
  console.error((await page.locator("body").innerText()).slice(0, 3500)); throw error;
} finally { await browser.close(); await server.close(); }
