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
const DONE_KEY = "learning_placement_completed_at";
const b64 = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

/** A browser context signed in as a synthetic account whose auth metadata the mock keeps. */
const openAs = async ({ id, metadata = {}, placement = null, viewport = { width: 390, height: 844 }, colorScheme = "light", reducedMotion = "reduce" }) => {
  const account = { metadata: { ...metadata }, writes: [] };
  const user = () => ({ id, aud: "authenticated", role: "authenticated", email: `placement-${id.slice(-4)}@example.invalid`, app_metadata: { provider: "email", providers: ["email"] }, user_metadata: account.metadata, created_at: "2026-10-21T00:00:00Z" });
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const token = [b64({ alg: "HS256", typ: "JWT" }), b64({ sub: id, aud: "authenticated", role: "authenticated", exp, aal: "aal1" }), Buffer.from("local-test").toString("base64url")].join(".");
  const session = { access_token: token, refresh_token: "local-test", token_type: "bearer", expires_in: 3600, expires_at: exp, user: user() };
  const context = await browser.newContext({ viewport, colorScheme, reducedMotion });
  const page = await context.newPage();
  page.on("pageerror", (error) => pageErrors.push(error.message));
  // Only the first load seeds storage: later loads keep what the app saved.
  await page.addInitScript(({ session, placementKey, placement }) => {
    if (!localStorage.getItem("sb-example-auth-token")) localStorage.setItem("sb-example-auth-token", JSON.stringify(session));
    if (placement && !localStorage.getItem(placementKey)) localStorage.setItem(placementKey, JSON.stringify(placement));
  }, { session, placementKey: `mariners-book.placement.v1:${id}`, placement });
  let cloudProgress = {};
  await page.route("https://example.supabase.co/**", async (route) => {
    const request = route.request();
    const url = request.url();
    if (url.includes("/rpc/merge_learning_progress")) {
      cloudProgress = { ...cloudProgress, ...(request.postDataJSON()?.incoming ?? {}) };
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(cloudProgress) });
    }
    if (url.includes("/auth/v1/user")) {
      if (request.method() === "PUT") {
        const data = request.postDataJSON()?.data ?? {};
        account.writes.push(data);
        Object.assign(account.metadata, data);
      }
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(user()) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: "[]" });
  });
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ current: { temperature_2m: 18, wind_speed_10m: 5, wind_direction_10m: 90, weather_code: 0 }, daily: { sunrise: ["2026-10-21T07:00"], sunset: ["2026-10-21T18:00"] } }) }));
  await page.route("https://api.bigdatacloud.net/**", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ city: "Test port", countryName: "Test" }) }));
  return { page, account, context };
};

const goto = async (page, route) => {
  await page.goto(base + route);
  await page.locator("#splash-root").waitFor({ state: "detached", timeout: 90000 });
  await page.waitForTimeout(400);
};
const dialogOf = (page) => page.getByRole("dialog", { name: "Personal learning pathway" });
const noOverflow = async (page) => {
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Horizontal overflow: ${page.url()}`);
  const dialog = dialogOf(page);
  if (await dialog.count()) assert(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth + 1), `Placement overflows horizontally: ${page.url()}`);
};
const settle = async (page, ms = 1600) => page.waitForTimeout(ms);
/** Clicks Continue/Previous and waits until the next question's answers replace the outgoing ones. */
const step = async (page, button) => {
  const before = await page.evaluate(() => document.querySelector('input[type="radio"]')?.name ?? null);
  await button.click();
  await page.waitForFunction((name) => {
    const radios = [...document.querySelectorAll('input[type="radio"]')];
    return radios.length > 0 && radios.every((radio) => radio.name !== name);
  }, before);
};
let active;

try {
  // ── First sign-in: the placement covers the app until it is finished ──
  active = await openAs({ id: "00000000-0000-4000-8000-000000000001" });
  const { page, account } = active;
  const next = () => page.getByRole("button", { name: "Continue", exact: true });
  const radio = (index) => page.getByRole("radio").nth(index);
  const dialog = dialogOf(page);
  await goto(page, "/");
  await dialog.waitFor({ timeout: 60000 });
  await page.getByRole("heading", { name: "Welcome aboard!", exact: true }).waitFor();
  assert.equal(await page.locator("[data-app-tabbar]").count(), 0, "Required placement showed the toolbar");
  assert.equal(await page.locator("#root").getAttribute("inert"), "", "The app behind the placement stayed interactive");
  assert.equal(await page.getByRole("button", { name: "Explore subjects without placement", exact: true }).count(), 0, "Required placement offered a skip");
  await noOverflow(page);
  await page.screenshot({ path: path.join(output, "placement-welcome-mobile.png") });
  await page.getByRole("button", { name: "Let's begin", exact: true }).click();
  await radio(0).waitFor();
  assert(await next().isDisabled());
  await radio(1).check(); await step(page, next());
  await radio(1).check(); await step(page, next());
  await radio(1).check(); await step(page, next());
  await radio(0).check(); await step(page, next());
  await radio(1).check();
  await noOverflow(page);
  await page.screenshot({ path: path.join(output, "placement-question-mobile.png") });
  await step(page, next());
  const buoyancy = page.getByRole("heading", { name: "A ship floats at rest. What balances its weight?", exact: true });
  await buoyancy.waitFor();
  // The back button cannot leave an unfinished placement.
  await page.goBack().catch(() => null);
  await page.waitForTimeout(600);
  assert(await dialog.isVisible(), "Back closed the required placement");
  assert(await buoyancy.isVisible(), "Back changed the question");
  // Leaving the app resumes at the same question.
  await page.reload();
  await page.locator("#splash-root").waitFor({ state: "detached", timeout: 90000 });
  await dialog.waitFor({ timeout: 60000 });
  await buoyancy.waitFor();
  assert(await next().isDisabled(), "Unanswered step must require a choice");
  assert.equal(await page.locator("[data-app-tabbar]").count(), 0, "Resume showed the toolbar");
  await step(page, page.getByRole("button", { name: "Previous", exact: true }));
  assert(await radio(1).isChecked(), "Previous selection was lost");
  await step(page, next());
  for (const answer of [2, 1, 0, 2]) { await radio(answer).check(); await step(page, next()); }
  await radio(3).check();
  assert.equal(account.writes.length, 0, "Completion was recorded before the last answer");
  await page.getByRole("button", { name: "Show my learning path", exact: true }).click();
  await page.getByRole("heading", { name: "Ready for deeper study", exact: true }).waitFor();
  assert(await dialog.isVisible(), "The result left the placement before the user chose to");
  for (let i = 0; i < 20 && !account.writes.length; i++) await page.waitForTimeout(150);
  assert.equal(account.writes.length, 1, "Completion was not recorded on the account");
  assert(Number.isFinite(Date.parse(account.writes[0][DONE_KEY])), "Account record is not a timestamp");
  assert.deepEqual(Object.keys(account.writes[0]), [DONE_KEY], "Answers must stay on the device");
  assert((await dialog.locator('section[aria-labelledby="placement-path"] ol a').first().getAttribute("href")) === "/lessons/meteorology/topics");
  await noOverflow(page);
  await page.screenshot({ path: path.join(output, "placement-result-mobile.png") });
  await dialog.getByText("Review my answers", { exact: true }).click();
  await dialog.getByText("Your answer: I don't know yet", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Continue to the app", exact: true }).click();
  await dialog.waitFor({ state: "detached" });
  assert.equal(await page.locator("#root").getAttribute("inert"), null, "The app stayed inert after the placement");
  assert.equal(await page.locator("[data-app-tabbar]").count(), 1, "Leaving the placement did not restore the toolbar");
  // Quick Access no longer lists the learning map.
  await page.locator('section[aria-labelledby="quick-access-title"]').waitFor();
  assert.equal(await page.locator('section[aria-labelledby="quick-access-title"] a[href="/lessons/map"]').count(), 0, "Quick Access still lists the learning map");
  await page.reload();
  await page.locator("#splash-root").waitFor({ state: "detached", timeout: 90000 });
  await page.waitForTimeout(1500);
  assert.equal(await dialog.count(), 0, "A finished placement opened again");

  // ── The learning map opens on the catalogue; the placement waits behind a button ──
  await goto(page, "/lessons/map");
  await page.getByRole("heading", { name: "Maritime learning map", exact: true }).waitFor();
  assert.equal(await dialog.count(), 0);
  await page.getByRole("button", { name: "My personal learning path", exact: true }).click();
  await page.getByRole("heading", { name: "Ready for deeper study", exact: true }).waitFor();
  await page.getByRole("link", { name: "Start my learning path", exact: true }).click();
  await page.waitForURL("**/lessons/meteorology/topics");
  assert.equal(await page.locator("[data-app-tabbar]").count(), 1, "Lesson lost toolbar");
  await goto(page, "/lessons/map");
  await page.getByRole("button", { name: "My personal learning path", exact: true }).click();
  await page.getByRole("button", { name: "Retake placement", exact: true }).click();
  await radio(0).waitFor();
  assert(await next().isDisabled());
  assert.equal(await dialog.count(), 0, "A retake on the map became the required placement");
  assert.equal(await page.getByRole("button", { name: "Explore subjects without placement", exact: true }).count(), 1, "An optional retake must stay skippable");
  for (let i = 0; i < 4; i++) { await radio(2).check(); await step(page, next()); }
  // Returning to change the department clears existing diagnostic responses.
  await radio(1).check(); await step(page, next());
  for (let i = 0; i < 4; i++) await step(page, page.getByRole("button", { name: "Previous", exact: true }));
  await radio(1).check(); await radio(2).check(); await step(page, next());
  await step(page, next()); await step(page, next());
  assert(await next().isDisabled(), "Department change retained diagnostic answers");
  for (const answer of [1, 2, 0, 2, 1]) { await radio(answer).check(); await step(page, next()); }
  await radio(0).check(); await page.getByRole("button", { name: "Show my learning path", exact: true }).click();
  await page.getByRole("heading", { name: "Ready for deeper study", exact: true }).waitFor();
  assert(await page.locator('a[href="/machine/engine-room-ops/topics"]').count() > 0);
  await page.setViewportSize({ width: 1280, height: 900 }); await noOverflow(page);
  await page.screenshot({ path: path.join(output, "placement-result-desktop.png"), fullPage: true });
  await page.getByRole("button", { name: "Explore all subjects", exact: true }).click();
  assert.equal(await page.locator("[data-app-tabbar]").count(), 1, "Catalogue lost toolbar");
  await page.getByRole("button", { name: "Engine learning sequence", exact: true }).click();
  await page.locator('input[placeholder="Find a course or topic…"]').fill("Appraisal");
  await page.locator('a[href*="navigation-appraisal"]').waitFor({ state: "visible" });
  await page.getByRole("button", { name: "My personal learning path", exact: true }).click();
  await page.getByRole("heading", { name: "Ready for deeper study", exact: true }).waitFor();
  await active.context.close();

  // ── Finished on another device: the account record is enough ──
  active = await openAs({ id: "00000000-0000-4000-8000-000000000002", metadata: { [DONE_KEY]: "2026-10-30T08:00:00.000Z" } });
  await goto(active.page, "/");
  await active.page.locator('section[aria-labelledby="quick-access-title"]').waitFor({ timeout: 60000 });
  await active.page.waitForTimeout(1500);
  assert.equal(await dialogOf(active.page).count(), 0, "An account that finished elsewhere was asked again");
  assert.equal(active.account.writes.length, 0);
  await active.context.close();

  // ── Finished on this device while offline: copied to the account, not asked again ──
  const finished = { version: 1, step: 9, completed: true, answers: { experience: 1, track: 1, goal: 1, pace: 0, port: 1, buoyancy: 2, latitude: 1, knots: 0, "free-surface": 2, swell: 1 } };
  active = await openAs({ id: "00000000-0000-4000-8000-000000000003", placement: finished });
  await goto(active.page, "/");
  await active.page.locator('section[aria-labelledby="quick-access-title"]').waitFor({ timeout: 60000 });
  for (let i = 0; i < 20 && !active.account.writes.length; i++) await active.page.waitForTimeout(150);
  assert.equal(await dialogOf(active.page).count(), 0, "A placement finished on this device was asked again");
  assert.equal(active.account.writes.length, 1, "The offline completion was not copied to the account");
  await active.context.close();

  // ── The real motion path, in dark appearance, on phone and tablet sizes ──
  active = await openAs({ id: "00000000-0000-4000-8000-000000000004", colorScheme: "dark", reducedMotion: "no-preference" });
  await goto(active.page, "/");
  await dialogOf(active.page).waitFor({ timeout: 60000 });
  await settle(active.page);
  await active.page.screenshot({ path: path.join(output, "placement-welcome-mobile-dark.png") });
  await active.page.getByRole("button", { name: "Let's begin", exact: true }).click();
  const darkRadio = (index) => active.page.getByRole("radio").nth(index);
  const darkNext = () => active.page.getByRole("button", { name: "Continue", exact: true });
  await darkRadio(0).waitFor();
  await darkRadio(1).check(); await step(active.page, darkNext());
  await darkRadio(1).check();
  await settle(active.page);
  await noOverflow(active.page);
  await active.page.screenshot({ path: path.join(output, "placement-question-mobile-dark.png") });
  for (const [name, viewport] of [["tablet-portrait", { width: 800, height: 1280 }], ["tablet-landscape", { width: 1280, height: 800 }]]) {
    await active.page.setViewportSize(viewport);
    await settle(active.page, 600);
    await noOverflow(active.page);
    await active.page.screenshot({ path: path.join(output, `placement-question-${name}-dark.png`) });
  }
  await active.context.close();

  assert.deepEqual(pageErrors, []);
  console.log("Placement UI OK: required first-sign-in placement (no skip, back swallowed, resume, account record), quick access, optional map retake (deck/engine, branch change), account/offline completion, phone/tablet/desktop, light/dark.");
} catch (error) {
  if (active?.page && !active.page.isClosed()) {
    await active.page.screenshot({ path: path.join(output, "placement-failure.png"), fullPage: true });
    console.error((await active.page.locator("body").innerText()).slice(0, 3500));
  }
  throw error;
} finally { await browser.close(); await server.close(); }
