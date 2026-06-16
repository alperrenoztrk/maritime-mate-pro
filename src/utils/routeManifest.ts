// Concrete URL list for the language-switch harvester. We enumerate every
// route declared in src/App.tsx and substitute a small set of representative
// values for the dynamic segments so the harvester actually renders real
// content. Routes that have nothing to translate (auth callbacks, redirects)
// are excluded.

const LESSON_TOPIC_KEYS = [
  'stability',
  'cargo',
  'seamanship',
  'safety',
  'environment',
  'economics',
];

// Used for /lessons/:categoryId/topics/:topicTitle — picking one real-looking
// title per category is enough to exercise the page's translation surface.
const LESSON_CATEGORY_TOPIC_SAMPLES: Record<string, string> = {
  stability: 'gm',
  cargo: 'draft-survey',
  seamanship: 'knots',
  safety: 'lifeboat',
  environment: 'marpol',
  economics: 'freight',
};

const MACHINE_TOPICS = ['engine', 'pump', 'boiler', 'generator', 'compressor'];

const MACHINE_SUBTOPIC_SAMPLE = 'overview';

const CREW_ROLES = ['captain', 'chief-officer', 'chief-engineer', 'bosun'];
const SHIP_TYPES = ['bulk-carrier', 'tanker', 'container'];
const SHIP_TASK_SLUGS = ['mooring', 'anchoring', 'cargo-loading'];
const BRIDGE_DEVICE_IDS = ['radar', 'gps', 'ecdis', 'gyro-compass'];
const SHIP_SYSTEM_SECTIONS = ['engine-room', 'deck', 'navigation-bridge'];
const REGULATION_SLUGS = ['solas', 'marpol', 'stcw', 'colreg'];
const STABILITY_FORMULA_IDS = ['gm', 'gz', 'bm'];
const NAVIGATION_CALC_IDS = ['great-circle', 'rhumb-line', 'mercator'];
const SEAMANSHIP_CALC_TOOLS = ['rope-load', 'anchor-holding', 'turning-circle'];
const CALCULATION_SECTION_SAMPLES: Array<[string, string]> = [
  ['stability', 'gm'],
  ['cargo', 'draft-survey'],
  ['navigation', 'great-circle'],
];

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

  // /lessons/:topicKey/{formulas,calculations,rules,quiz}
  for (const t of LESSON_TOPIC_KEYS) {
    out.push(`/lessons/${t}/formulas`);
    out.push(`/lessons/${t}/calculations`);
    out.push(`/lessons/${t}/rules`);
    out.push(`/lessons/${t}/quiz`);
  }

  // /lessons/:categoryId/topics/:topicTitle
  for (const [cat, topic] of Object.entries(LESSON_CATEGORY_TOPIC_SAMPLES)) {
    out.push(`/lessons/${cat}/topics/${topic}`);
  }

  // /machine/:topicSlug/...
  for (const m of MACHINE_TOPICS) {
    out.push(`/machine/${m}/topics`);
    out.push(`/machine/${m}/calculations`);
    out.push(`/machine/${m}/formulas`);
    out.push(`/machine/${m}/rules`);
    out.push(`/machine/${m}/assistant`);
    out.push(`/machine/${m}/quiz`);
    out.push(`/machine/${m}/topics/${MACHINE_SUBTOPIC_SAMPLE}`);
  }

  // /crew/:roleSlug and /crew/:roleSlug/task/:taskIndex
  for (const role of CREW_ROLES) {
    out.push(`/crew/${role}`);
    out.push(`/crew/${role}/task/0`);
  }

  // /ship-operations/:shipType
  for (const s of SHIP_TYPES) out.push(`/ship-operations/${s}`);

  // /ship-tasks/:taskSlug
  for (const s of SHIP_TASK_SLUGS) out.push(`/ship-tasks/${s}`);

  // /bridge/:deviceId
  for (const d of BRIDGE_DEVICE_IDS) out.push(`/bridge/${d}`);

  // /ship-systems/:sectionId
  for (const s of SHIP_SYSTEM_SECTIONS) out.push(`/ship-systems/${s}`);

  // /regulations/:slug
  for (const s of REGULATION_SLUGS) out.push(`/regulations/${s}`);

  // /stability/formulas/:id
  for (const id of STABILITY_FORMULA_IDS) out.push(`/stability/formulas/${id}`);

  // /navigation/calc/:id
  for (const id of NAVIGATION_CALC_IDS) out.push(`/navigation/calc/${id}`);

  // /seamanship/calculations/:tool
  for (const t of SEAMANSHIP_CALC_TOOLS) out.push(`/seamanship/calculations/${t}`);

  // /calculations/:categoryId/:sectionId
  for (const [cat, sec] of CALCULATION_SECTION_SAMPLES) {
    out.push(`/calculations/${cat}/${sec}`);
  }

  return out;
};

// Routes that must NOT be harvested (auth callbacks, redirects, etc).
const EXCLUDED = new Set<string>(['/auth/callback', '/widgets', '/empty-page']);

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

// Bump this string whenever the manifest meaningfully changes so the
// `mt-harvest-done-*` flag is invalidated and a fresh harvest runs.
export const HARVEST_VERSION = 'v2';
