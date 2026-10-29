import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from 'vite';

// Local fixture for the real beta page; no account or service data is accessed.
const fixture = path.resolve('tmp/ocean-ui-fixture');
const output = path.resolve(process.env.OCEAN_SCREENSHOT_DIR ?? 'tmp/ocean-ui');
await fs.mkdir(fixture, { recursive: true }); await fs.mkdir(output, { recursive: true });
await fs.writeFile(path.join(fixture, 'index.html'), '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><div id="root"></div><script type="module" src="/tmp/ocean-ui-fixture/main.tsx"></script></body></html>');
await fs.writeFile(path.join(fixture, 'main.tsx'), `
import React from 'react';
import { createRoot } from 'react-dom/client';
import { _roots } from '@react-three/fiber';
import BetaShipSimulator from '/src/pages/BetaShipSimulator';
import Ship3DVisualization from '/src/components/stability/Ship3DVisualization';
import '/src/index.css';
document.documentElement.classList.add('dark');
window.__motion = () => {
  const state = _roots.get(document.querySelector('canvas'))?.store.getState();
  const ship = state?.scene.getObjectByName('vessel-motion');
  return ship ? { roll:ship.rotation.x, pitch:ship.rotation.z, heave:ship.position.y } : null;
};
window.__stats = () => {
  const state = _roots.get(document.querySelector('canvas'))?.store.getState();
  const ocean = state?.scene.getObjectByName('ocean-surface');
  return ocean ? { frame: state.gl.info.render.frame, calls: state.gl.info.render.calls,
    triangles: state.gl.info.render.triangles, waterVertices: ocean.geometry.attributes.position.count,
    dpr: state.gl.getPixelRatio(), shadows: state.gl.shadowMap.enabled,
    textures: state.gl.info.memory.textures, geometries: state.gl.info.memory.geometries } : null;
};
createRoot(document.getElementById('root')).render(location.search.includes('calculations') ? <Ship3DVisualization /> : <BetaShipSimulator />);
`);
const server = await createServer({ server: { host: '127.0.0.1', port: 5187, strictPort: true } });
let browser;
try {
  await server.listen();
  browser = await chromium.launch({
    headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      ...(process.env.PLAYWRIGHT_SINGLE_PROCESS ? ['--single-process', '--no-zygote'] : [])],
  });
  const errors = [];
  const context = await browser.newContext({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 1 });
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const url = 'http://127.0.0.1:5187/tmp/ocean-ui-fixture/index.html';
  const motion = () => page.evaluate(() => window.__motion());
  const stats = () => page.evaluate(() => window.__stats());
  const viewport = page.getByTestId('ship-viewport');
  const wait = ms => page.waitForTimeout(ms);
  async function selectSea(name) {
    await page.getByRole('combobox', { name: 'Sea state', exact: true }).click();
    await page.getByRole('option', { name }).click(); await viewport.scrollIntoViewIfNeeded();
  }
  await page.goto(url); await page.waitForFunction(() => !!window.__motion());
  await viewport.scrollIntoViewIfNeeded(); await wait(4000);
  assert.equal(await page.getByRole('slider', { name: 'Wind heeling moment' }).count(), 0, 'wind moment removed');
  const balancedStats = await stats();
  assert.equal(balancedStats.waterVertices, 97 * 97);
  assert.equal(balancedStats.shadows, false);
  const startFrame = balancedStats.frame; await wait(2000);
  const activeFrames = (await stats()).frame - startFrame;
  assert.ok(activeFrames > 0 && activeFrames <= 65, 'balanced renderer capped near 30 Hz');
  const excursions = await page.evaluate(() => new Promise(resolve => {
    const range = { roll: [Infinity, -Infinity], pitch: [Infinity, -Infinity] };
    const timer = setInterval(() => {
      const pose = window.__motion();
      for (const axis of ['roll', 'pitch']) {
        range[axis][0] = Math.min(range[axis][0], pose[axis]);
        range[axis][1] = Math.max(range[axis][1], pose[axis]);
      }
    }, 100);
    setTimeout(() => { clearInterval(timer); resolve(range); }, 22000);
  }));
  for (const axis of ['roll', 'pitch']) {
    assert.ok(excursions[axis][0] < -0.0001 && excursions[axis][1] > 0.0001, `rendered ${axis} crosses upright both ways`);
  }
  const first = await motion(); await wait(1500);
  assert.notDeepEqual(await motion(), first, 'roll/pitch/heave animate');
  await selectSea(/6 · Very rough/);
  await page.getByRole('button', { name: 'Bow', exact: true }).click();
  await viewport.scrollIntoViewIfNeeded(); await wait(6000);
  await viewport.screenshot({ path: path.join(output, 'passage-desktop.png') });
  await page.getByRole('button', { name: 'Pause', exact: true }).click(); await wait(700);
  const frozen = await motion(), frozenFrame = (await stats()).frame; await wait(1000);
  assert.equal((await stats()).frame, frozenFrame, 'paused scene does not keep rendering');
  assert.deepEqual(await motion(), frozen, 'pause freezes vessel');
  const frame1 = await viewport.screenshot(); await wait(500);
  assert.ok(frame1.equals(await viewport.screenshot()), 'water, foam, flag and exhaust freeze together');
  await page.getByLabel('Water detail').selectOption('high'); await wait(600);
  const highStats = await stats();
  assert.equal(highStats.waterVertices, 193 * 193); assert.equal(highStats.shadows, true);
  await page.getByLabel('Water detail').selectOption('performance'); await wait(600);
  const performanceStats = await stats();
  assert.equal(performanceStats.waterVertices, 65 * 65); assert.equal(performanceStats.shadows, false);
  assert.ok(performanceStats.triangles < highStats.triangles);
  await page.getByLabel('Water detail').selectOption('balanced'); await wait(600);
  const restoredStats = await stats();
  assert.ok(restoredStats.geometries <= balancedStats.geometries + 1, 'quality changes release old geometry');
  assert.ok(restoredStats.textures <= highStats.textures, 'quality changes do not leak textures');
  assert.equal((await motion()).roll, frozen.roll, 'quality change does not advance paused physics');
  await page.getByRole('button', { name: 'Restart', exact: true }).click(); await wait(500);
  const restarted = await motion(); assert.equal(restarted.heave, 0, 'restart clears motion');
  await page.getByRole('button', { name: 'Play', exact: true }).click(); await wait(1500);
  assert.notEqual((await motion()).roll, restarted.roll, 'resume advances motion');
  await page.getByLabel('Water detail').selectOption('balanced');
  console.log('Animation, render budget, pixel freeze, detail, restart and resume passed.');
  // A shorter viewport allows the canvas to leave the screen completely.
  await page.setViewportSize({ width: 1100, height: 600 });
  // Bypass the app's smooth scroll; wait for actual visibility before taking
  // the baseline (software rendering can delay IntersectionObserver delivery).
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('[data-testid="ship-viewport"]').getBoundingClientRect().bottom <= 0);
  await wait(1500);
  const offscreen = await motion(), offscreenFrame = (await stats()).frame; await wait(1000);
  assert.deepEqual(await motion(), offscreen, 'offscreen physics stops');
  assert.ok((await stats()).frame - offscreenFrame <= 1, 'offscreen has at most one queued invalidation, no continuous rendering');
  await page.setViewportSize({ width: 1100, height: 1000 });
  await viewport.scrollIntoViewIfNeeded(); await wait(800);
  assert.notDeepEqual(await motion(), offscreen, 'scrolling back resumes simulation');
  for (const ship of ['Tanker', 'Bulk', 'Ro-Ro', 'Passenger', 'Container']) {
    await page.getByRole('combobox', { name: 'Ship type', exact: true }).click();
    await page.getByRole('option', { name: ship, exact: true }).click(); await wait(400);
  }
  await selectSea(/0 · Calm/);
  // Let wave parameters settle, then reset any residual free oscillation.
  await wait(7000); await page.getByRole('button', { name: 'Restart', exact: true }).click();
  await viewport.scrollIntoViewIfNeeded(); await wait(1000);
  const calm = await motion();
  assert.ok(Math.abs(calm.roll) < 0.0001 && Math.abs(calm.pitch) < 0.0001, 'calm sea has no imposed list');
  const speed = page.getByRole('slider', { name: 'Speed (kn)', exact: true });
  await speed.focus(); await page.keyboard.press('Home');
  assert.equal(await speed.getAttribute('aria-valuenow'), '0');
  await viewport.scrollIntoViewIfNeeded(); await wait(2000);
  await page.getByRole('button', { name: 'Harbour', exact: true }).click();
  await viewport.scrollIntoViewIfNeeded(); await wait(2000);
  await viewport.screenshot({ path: path.join(output, 'harbour.png') });
  await page.getByRole('button', { name: 'Passage', exact: true }).click();
  await selectSea(/6 · Very rough/);
  await page.setViewportSize({ width: 375, height: 900 });
  await page.reload(); await page.waitForFunction(() => !!window.__motion());
  assert.equal(await page.getByLabel('Water detail').inputValue(), 'performance', 'phones start in performance mode');
  await selectSea(/6 · Very rough/);
  await viewport.scrollIntoViewIfNeeded(); await wait(2000);
  await page.screenshot({ path: path.join(output, 'passage-mobile.png'), fullPage: true });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '375px layout');
  await page.setViewportSize({ width: 320, height: 812 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '320px layout');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload(); await page.waitForFunction(() => !!window.__motion());
  assert.equal(await page.getByRole('button', { name: 'Play', exact: true }).count(), 1, 'reduced motion starts paused');
  const reduced = await motion(); await wait(800); assert.deepEqual(await motion(), reduced);
  console.log('All vessel types, calm, harbour, mobile and reduced motion passed.');
  await page.goto(url + '?calculations'); await page.waitForFunction(() => !!window.__motion()); await wait(1500);
  assert.ok(await page.getByText('3D Ship Simulation', { exact: true }).count());
  assert.deepEqual(errors, [], 'no React, GLSL or WebGL errors');
  const result = { passed: true, first, balancedStats, performanceStats, highStats, activeFrames, excursions, output };
  await fs.writeFile(path.join(output, 'validation.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser?.close(); await server.close(); await fs.rm(fixture, { recursive: true, force: true });
}
