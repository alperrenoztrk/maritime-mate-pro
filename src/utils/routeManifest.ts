// Concrete URL list for the language-switch harvester. We enumerate every
// static route in src/App.tsx and substitute a small set of representative
// values for the most useful dynamic routes. Routes that have nothing to
// translate (auth/callback, redirects), or that are heavy/known to crash in
// an off-screen iframe, are excluded.

const TOPIC_KEYS = [
  'stability',
  'cargo',
  'seamanship',
  'safety',
  'environment',
  'economics',
];

const MACHINE_TOPICS = ['engine', 'pump', 'boiler', 'generator', 'compressor'];

const STATIC_ROUTES: string[] = [
  '/',
  '/maritime-news',
  '/calculations',
  '/lessons',
  '/glossary',
  '/beta',
  '/beta/work-hours',
  '/beta/psc-checklist',

  '/lessons/stability/topics',
  '/lessons/cargo/topics',
  '/lessons/seamanship/topics',
  '/lessons/safety/topics',
  '/lessons/environment/topics',
  '/lessons/economics/topics',

  '/crew',
  '/bridge',
  '/machinery',
  '/ship-tasks',
  '/ship-operations',
  '/passage-plan',
  '/ship-systems',

  // Stability
  '/stability/assistant',
  '/stability/rules',
  '/stability/gz-imo',
  '/stability/advanced',
  '/stability/grain',
  '/stability/gm',
  '/stability/weight-shift',
  '/stability/free-surface',
  '/stability/gz',
  '/stability/analysis',
  '/stability/stable-tales',
  '/stability/formulas',
  '/stability/calculations',
  '/stability/practical',
  '/stability/practical/tank',
  '/stability/practical/fwa',
  '/stability/practical/ghm',
  '/stability/quiz',
  '/stability/shearing-bending',
  '/stability/grain-calculation',
  '/stability/gz-curve',
  '/stability/wind-weather',
  '/stability/imo-criteria',

  '/safety',
  '/meteorology/topics',
  '/tank',

  // Cargo
  '/cargo/calculations',
  '/cargo/calculations/draft-survey',
  '/cargo/calculations/preloading',
  '/cargo/calculations/intermediate',
  '/cargo/calculations/postdischarge',
  '/cargo/calculations/comparative',
  '/cargo/calculations/ballast',
  '/cargo/calculations/density',
  '/cargo/calculations/bunker',
  '/cargo/formulas',
  '/cargo/rules',
  '/cargo/assistant',
  '/cargo/quiz',

  // Meteorology
  '/meteorology/formulas',
  '/meteorology/rules',
  '/meteorology/assistant',
  '/meteorology/quiz',

  '/ballast',
  '/engine',
  '/hydrodynamics',
  '/structural',
  '/special-ships',
  '/emissions',

  // Environment
  '/environment/calculations',
  '/environment/formulas',
  '/environment/rules',
  '/environment/assistant',
  '/environment/quiz',

  // SOLAS
  '/solas/regulations',
  '/solas/certificates',
  '/solas/ship-requirements',
  '/solas/safety-equipment',

  // Seamanship
  '/seamanship/knots',
  '/seamanship/calculations',
  '/seamanship/formulas',
  '/seamanship/rules',
  '/seamanship/assistant',
  '/seamanship/quiz',

  // Safety
  '/safety/formulas',
  '/safety/rules',
  '/safety/assistant',
  '/safety/quiz',

  // Machine
  '/machine/calculations',
  '/machine/formulas',
  '/machine/rules',
  '/machine/assistant',
  '/machine/quiz',

  // Navigation
  '/navigation',
  '/navigation/tide-tutorial',
  '/navigation/formulas',
  '/navigation/rules',
  '/navigation/meteorology',
  '/navigation/colreg-presentation',
  '/navigation/assistant',
  '/navigation/quiz',

  '/economics',
  '/moon-phases',
  '/settings',
  '/formulas',
  '/regulations',
  '/clock',
  '/weather-forecast',
  '/sunset-times',
  '/sunrise-times',
  '/location-selector',
  '/exam-preparation',
  '/converter',
  '/machine-calculations',
];

const dynamicRoutes = (): string[] => {
  const out: string[] = [];
  for (const t of TOPIC_KEYS) {
    out.push(`/lessons/${t}/formulas`);
    out.push(`/lessons/${t}/calculations`);
    out.push(`/lessons/${t}/rules`);
    out.push(`/lessons/${t}/quiz`);
  }
  for (const m of MACHINE_TOPICS) {
    out.push(`/machine/${m}/topics`);
    out.push(`/machine/${m}/calculations`);
    out.push(`/machine/${m}/formulas`);
    out.push(`/machine/${m}/rules`);
    out.push(`/machine/${m}/assistant`);
    out.push(`/machine/${m}/quiz`);
  }
  return out;
};

// Routes that must NOT be harvested (auth callbacks, redirects, etc).
const EXCLUDED = new Set<string>(['/auth/callback', '/widgets']);

export const getHarvestRoutes = (): string[] => {
  const all = [...STATIC_ROUTES, ...dynamicRoutes()];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const r of all) {
    if (EXCLUDED.has(r)) continue;
    if (seen.has(r)) continue;
    seen.add(r);
    out.push(r);
  }
  return out;
};

export const HARVEST_VERSION = 'v1';
