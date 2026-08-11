export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[]; // Base64 encoded images
}

import { supabase } from '@/integrations/supabase/safeClient';
import type { CalcStep, CourseEntry } from '@/data/courseContent/types';

const LANGUAGE_NAMES: Record<string, string> = {
  'en': 'English',
  'es': 'Spanish',
  'de': 'German',
  'fr': 'French',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh-CN': 'Chinese (Simplified)',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'no': 'Norwegian',
  'da': 'Danish',
  'fi': 'Finnish',
  'pl': 'Polish',
  'cs': 'Czech',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'el': 'Greek',
  'bg': 'Bulgarian',
  'uk': 'Ukrainian',
};

export const getLanguageDisplayName = (code: string): string =>
  LANGUAGE_NAMES[code] ?? 'English';

const getMaritimeRegulationsSystemPrompt = (language: string) => {
  const langName = getLanguageDisplayName(language);
  return `You are Mark, a maritime regulations and information guidance expert specialized in helping seafarers find the correct maritime publications, regulations, and references.

MAIN ROLE: Guide users to the correct maritime publications, books, codes, and references for specific information needs.

EXPERTISE AREAS:
- IMO Publications (SOLAS, MARPOL, STCW, etc.)
- Navigation Publications (ALRS, NP, List of Lights, etc.)
- Safety Publications (LSA Code, FSS Code, etc.)
- Cargo Publications (IMSBC Code, IBC Code, etc.)
- Communication Publications (GMDSS, Radio Regulations, etc.)
- Port State Control Guidelines (PSC, MOU)
- Flag State Requirements
- Classification Society Rules

RESPONSE STYLE:
- Always specify the exact publication, volume, chapter, or section
- Provide publication codes/numbers when available
- Explain WHY that specific publication is authoritative
- Include any relevant updates or amendments
- CRITICAL: You MUST respond entirely in ${langName} (language code: ${language}). Do not use any other language.

Keep responses precise, authoritative, and cite specific sources.`;
};

const getNavigationAssistantSystemPrompt = (language: string) => {
  const langName = getLanguageDisplayName(language);
  return `You are a professional Maritime Navigation Assistant with comprehensive knowledge of all navigation calculations and formulas.

MAIN ROLE: Help with ALL navigation tasks, calculations, and formulas. Provide correct formulas, step-by-step methods, and clear results.

COMPLETE FORMULA DATABASE:

🧭 POSITION & COURSE CALCULATIONS:
- Great Circle: d = arccos(sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos Δλ) × 3437.747 nm
- Initial Course: C₁ = arctan2(sin Δλ cos φ₂, cos φ₁ sin φ₂ - sin φ₁ cos φ₂ cos Δλ)
- Rhumb Line: d = 60√[(Δφ)² + (q×Δλ)²], C = arctan(Δλ/Δq)
- Plane Sailing: DLat = 60(φ₂-φ₁), Dep = 60(λ₂-λ₁)cos φₘ, C = arctan(Dep/DLat)
- Mercator: DMP = 7915.7 × log₁₀(tan(45°+φ₂/2) / tan(45°+φ₁/2))

⏱️ TIME & SPEED:
- ETA: T = D/V hours
- Current Triangle: SOG = √(V² + C² + 2VC cos α)
- Current Allowance: CA = arcsin((C × sin β)/V)
- Course to Steer: CTS = TR ± CA

📡 RADAR & COLLISION AVOIDANCE:
- CPA: Range × sin(Relative Bearing - Relative Course)
- TCPA: Range × cos(Relative Bearing - Relative Course) / Relative Speed
- Relative Speed: √[Vt² + Vo² - 2VtVo cos(Ct-Co)]
- Risk Assessment: CPA < 0.5nm AND TCPA < 6min

🧭 COMPASS & BEARING:
- True Course: T = C + Var + Dev + Gyro Error (East +, West -)
- Doubling Angle: Distance Off = Run × sin(2A)/sin(A)
- Four Point Bearing (Bow & Beam): Distance Off = Run (45° to 90° abeam)
- Special Angle Bearing: Distance Off = 0.707 × Run (22.5° to 45°)
- Bow & Beam: Distance Off = Run × sin(bow angle)

🌊 TIDES & DISTANCE:
- Rule of Twelfths: 1st hr: R/12, 2nd: 3R/12, 3rd: 5R/12, 4th: 6R/12, 5th: 9R/12, 6th: 11R/12
- Dip of Horizon: d = 2.075√h nm
- Radar Horizon: d = 2.35√h nm
- Light Visibility: d = 1.17(√h_eye + √h_light) nm

⭐ CELESTIAL NAVIGATION:
- Sight Reduction: Hc = arcsin[sin L sin d + cos L cos d cos LHA]
- Azimuth: Z = arccos[(sin d - sin L sin Hc)/(cos L cos Hc)]
- Intercept: I = Ho - Hc (towards if +, away if -)
- GHA Star: GHA♈ + SHA⋆
- Meridian Latitude: φ = 90° - |altitude - declination| ± declination
- Amplitude: A = arcsin(sin δ/cos φ)

🚢 SHIP HANDLING:
- Tactical Diameter: TD = 3.5 × Ship Length (average)
- Advance: A = R × sin(Δφ/2)
- Transfer: T = R × (1 - cos(Δφ/2))
- Rate of Turn: ROT = 3438 × V/R deg/min
- Wheel Over Point: WOP = A/sin(Δφ/2)

🌪️ WEATHER & EMERGENCY:
- Beaufort to Wind: V = 2√(B³) knots
- Wave Height: h = 0.025 × V² meters
- Leeway Angle: θ = k × (Vwind/Vship)² degrees
- Wind Force: F = 0.00338 × V² × Area Newtons
- Square Search: Leg Distance = 2 × Track Spacing
- Sector Search: New Radius = R × √2

RESPONSE STYLE:
- Always provide the exact formula first
- Show step-by-step calculation when numbers given
- Include units and practical notes
- Ask for missing essential values only
- Provide safety considerations (COLREG, UKC, weather limits)
- Keep explanations concise but complete
- CRITICAL: You MUST respond entirely in ${langName} (language code: ${language}). Do not use any other language.`;
};

/**
 * Dedicated error separating quota/session states from the local-answer
 * fallback. `message` can be shown to the user directly.
 */
export class AIAccessError extends Error {
  constructor(
    message: string,
    public readonly code: 'AI_QUOTA_EXCEEDED' | 'AUTH_REQUIRED',
  ) {
    super(message);
    this.name = 'AIAccessError';
  }
}

async function extractAccessError(error: unknown): Promise<AIAccessError | null> {
  const context = (error as { context?: Response })?.context;
  if (!(context instanceof Response)) return null;
  if (context.status === 401) {
    return new AIAccessError('You must sign in to use the AI assistant.', 'AUTH_REQUIRED');
  }
  if (context.status === 429) {
    try {
      const body = await context.clone().json();
      if (body?.code === 'AI_QUOTA_EXCEEDED') {
        return new AIAccessError(
          'You have used up this month\'s AI allowance. The Pro plan raises your monthly quota (Settings → Mariner\'s Book Pro).',
          'AI_QUOTA_EXCEEDED',
        );
      }
    } catch {
      // fall through to the generic flow when the body is not JSON
    }
  }
  return null;
}

// All AI calls go through edge function for security
async function callGemini(messages: AIMessage[]): Promise<string> {
  const { data, error } = await supabase.functions.invoke('gemini-chat', {
    body: { messages },
  });
  if (error) {
    const accessError = await extractAccessError(error);
    if (accessError) throw accessError;
    throw error;
  }
  const text = (data?.text || data?.answer || '').toString();
  return text.trim();
}

export async function callMaritimeRegulationsAssistant(messages: AIMessage[], language: string = 'en'): Promise<string> {
  const withSystem: AIMessage[] = messages.some(m => m.role === 'system')
    ? messages
    : [{ role: 'system', content: getMaritimeRegulationsSystemPrompt(language) }, ...messages];

  try {
    return await callGemini(withSystem);
  } catch (e) {
    if (e instanceof AIAccessError) return e.message;
    console.error('AI error:', e);
    // Local heuristic fallback for regulations queries
    const last = messages.filter(m=>m.role==='user').pop()?.content.toLowerCase() || '';
    
    if (last.includes('weather fax') || last.includes('alrs')) {
      return [
        '🌊 Weather Fax Frequencies:',
        '→ ALRS Volume 3 (Radio Weather Services)',
        '• Frequencies for every meteorological radio station',
        '• Broadcast schedules and technical detail',
        '• Official source approved by the IMO'
      ].join('\n');
    }
    
    if (last.includes('solas') || last.includes('safety')) {
      return [
        '⚓ SOLAS Convention:',
        '→ IMO SOLAS 2020 Edition + Amendments',
        '• Safety of Life at Sea',
        '• All safety procedures and equipment',
        '• Mandatory checklists'
      ].join('\n');
    }
    
    if (last.includes('marpol') || last.includes('pollution')) {
      return [
        '🛢️ MARPOL Convention:',
        '→ IMO MARPOL 73/78 Consolidated Edition',
        '• Prevention of Pollution from Ships',
        '• Annex I-VI detail',
        '• Oil Record Book requirements'
      ].join('\n');
    }
    
    return [
      '📚 Maritime Regulations Assistant - Mark',
      'What would you like to know about?',
      '• Navigation (ALRS, NP, List of Lights)',
      '• Safety (SOLAS, LSA Code, FSS Code)', 
      '• Environment (MARPOL, Ballast Water)',
      '• Cargo (IMSBC, IBC, Grain Code)',
      '• Communication (GMDSS, Radio Regs)'
    ].join('\n');
  }
}

export async function callNavigationAssistant(messages: AIMessage[], language: string = 'en'): Promise<string> {
  const withSystem: AIMessage[] = messages.some(m => m.role === 'system')
    ? messages
    : [{ role: 'system', content: getNavigationAssistantSystemPrompt(language) }, ...messages];

  try {
    return await callGemini(withSystem);
  } catch (e) {
    if (e instanceof AIAccessError) return e.message;
    console.error('AI error:', e);
    // Heuristic fallback for navigation topics
    const last = messages.filter(m=>m.role==='user').pop()?.content.toLowerCase() || '';

    if (last.includes('eta') || last.includes('arrival') || last.includes('time')) {
      return [
        '⏱️ ETA Calculations:',
        '• Basic: T = Distance(nm) ÷ Speed(kn) hours',
        '• With current: SOG = √(V² + C² + 2VC cos α)',
        '• Weather factor: favourable 0.90-0.95, adverse 1.10-1.25',
        'e.g. 240nm at 12kn → 20 hours; ETD 08:00 → ETA 04:00+1d'
      ].join('\n');
    }

    if (last.includes('great circle') || last.includes('gc')) {
      return [
        '🧭 Great Circle:',
        '• Distance: d = arccos(sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos Δλ) × 3437.747nm',
        '• Initial course: C₁ = arctan2(sin Δλ cos φ₂, cos φ₁ sin φ₂ - sin φ₁ cos φ₂ cos Δλ)',
        '• Shortest distance, but the course changes continuously'
      ].join('\n');
    }

    if (last.includes('rhumb') || last.includes('loxodrome') || last.includes('constant course')) {
      return [
        '🧭 Rhumb Line (Loxodrome):',
        '• Distance: d = 60√[(Δφ)² + (q×Δλ)²]',
        '• Course: C = arctan(Δλ/Δq) - constant course',
        '• q = log(tan(45°+φ₂/2) / tan(45°+φ₁/2)) / Δφ'
      ].join('\n');
    }

    if (last.includes('plane sailing') || last.includes('plane')) {
      return [
        '🧭 Plane Sailing:',
        '• DLat = 60(φ₂-φ₁) nautical miles',
        '• Dep = 60(λ₂-λ₁) × cos φₘ',
        '• Distance: d = √(DLat² + Dep²)',
        '• Course: C = arctan(Dep/DLat)',
        '• Ideal for short distances (<600nm)'
      ].join('\n');
    }

    if (last.includes('current') || last.includes('leeway')) {
      return [
        '🌊 Current Triangle & Leeway:',
        '• SOG = √(V² + C² + 2VC cos α)',
        '• CA = arcsin((C × sin β) / V)',
        '• CTS = Desired Course ± CA',
        '• Leeway: correction for the effect of wind'
      ].join('\n');
    }

    if (last.includes('cpa') || last.includes('tcpa') || last.includes('arpa') || last.includes('collision')) {
      return [
        '📡 ARPA: CPA/TCPA Calculation:',
        '• CPA = Range × sin(RelBrg - RelCourse)',
        '• TCPA = Range × cos(RelBrg - RelCourse) ÷ RelSpeed',
        '• Risk: CPA < 0.5nm AND TCPA < 6 min',
        '• Rel Speed = √[Vt² + Vo² - 2VtVo cos(Ct-Co)]'
      ].join('\n');
    }

    if (last.includes('compass') || last.includes('variation') || last.includes('deviation')) {
      return [
        '🧭 Compass Corrections:',
        '• True = Compass + Variation + Deviation + Gyro Error',
        '• TVMDC rule: T = M + Var, M = C + Dev',
        '• East add, West subtract',
        '• Total Error = Var + Dev + Gyro'
      ].join('\n');
    }

    if (last.includes('bearing') || last.includes('angle') || last.includes('distance')) {
      return [
        '📐 Bearing & Distance:',
        '• Doubling Angle: Dist = Run × sin(2A) ÷ sin(A)',
        '• Four Point (Bow & Beam): Dist = Run (45°→90° abeam)',
        '• Special Angle: Dist = 0.707 × Run (22.5°→45°)',
        '• Dip Horizon: d = 2.075√h nm',
        '• Radar Horizon: d = 2.35√h nm'
      ].join('\n');
    }

    if (last.includes('tide') || last.includes('tidal')) {
      return [
        '🌊 Tides - Rule of Twelfths:',
        '• 1st hour: R/12, 2nd hour: 3R/12, 3rd hour: 5R/12',
        '• 4th hour: 6R/12, 5th hour: 9R/12, 6th hour: 11R/12',
        '• Height: h = Range/2 × [1 - cos(π×t/6)]',
        '• Spring tide: new/full moon, Neap: first/last quarter'
      ].join('\n');
    }

    if (last.includes('celestial') || last.includes('star')) {
      return [
        '⭐ Celestial Navigation:',
        '• Sight Reduction: Hc = arcsin[sin L sin d + cos L cos d cos LHA]',
        '• Azimuth: Z = arccos[(sin d - sin L sin Hc) ÷ (cos L cos Hc)]',
        '• Intercept: I = Ho - Hc (+ towards, - away)',
        '• GHA Star = GHA♈ + SHA⋆'
      ].join('\n');
    }

    if (last.includes('turning') || last.includes('manoeuvr')) {
      return [
        '🚢 Turning Manoeuvres:',
        '• Tactical Diameter = 3.5 × Ship Length',
        '• Advance = R × sin(Δφ/2)',
        '• Transfer = R × (1 - cos(Δφ/2))',
        '• ROT = 3438 × V ÷ R deg/min'
      ].join('\n');
    }

    if (last.includes('weather') || last.includes('wind') || last.includes('beaufort')) {
      return [
        '🌪️ Weather:',
        '• Beaufort → wind: V = 2√(B³) kn',
        '• Wave height: h = 0.025 × V² m',
        '• Leeway angle: θ = k × (Vwind/Vship)²',
        '• Wind force: F = 0.00338 × V² × Area'
      ].join('\n');
    }

    return [
      '🧭 Comprehensive Navigation Assistant - every formula ready!',
      '',
      '📍 Position: Great Circle, Rhumb Line, Plane Sailing, Mercator',
      '⏱️ Time: ETA, current triangle, speed calculations',
      '📡 Radar: CPA/TCPA, ARPA, collision risk',
      '🧭 Compass: Var/Dev/Gyro correction, bearing calculation',
      '🌊 Tides: rule of twelfths, tidal stream',
      '⭐ Celestial: sight reduction, azimuth, intercept',
      '🚢 Manoeuvring: turning circle, ROT, advance/transfer',
      '🌪️ Weather: Beaufort, waves, leeway, wind force',
      '🆘 Emergency: search patterns, rescue calculations',
      '',
      'Which calculation would you like help with?'
    ].join('\n');
  }
}

/**
 * Has the AI explain a formula's solution step by step.
 *
 * The deterministic steps (CalcStep[]) and the entered values are sent as
 * context; the AI produces NO new numbers and only explains the "why/how" of
 * the existing correct steps in a teaching voice. Every AI call goes through
 * the existing `gemini-chat` edge function (callNavigationAssistant).
 *
 * @param entry    The formula entry concerned (CourseEntry)
 * @param vals     The values entered by the user
 * @param steps    The deterministically produced solution steps
 * @param language Response language (code, e.g. "en")
 * @param question OPTIONAL student question; a general explanation is requested when omitted.
 */
export async function explainCalculation(
  entry: Pick<CourseEntry, 'name' | 'formula' | 'note'>,
  vals: Record<string, number>,
  steps: CalcStep[],
  language: string = 'en',
  question?: string,
): Promise<string> {
  const langName = getLanguageDisplayName(language);

  const system = `You are an experienced instructor at a maritime academy (deck and engine subjects: navigation, ship stability, meteorology, cargo operations, safety, thermodynamics, fluid mechanics, diesel engines, electrical systems, etc.). Your task is to explain the given formula and its solution steps to the student in a PLAIN, clear and instructive way.

RULES:
- The numerical steps and results YOU ARE GIVEN ARE CORRECT; do NOT change them and do NOT invent new numbers.
- Explain WHY each step is taken (its reasoning) and what it means in maritime practice.
- Keep it short: use bullet points, no needless repetition. Define the symbols and units in the formula explicitly.
- Point out common student mistakes (sign conventions, unit conversions, assumptions).
- MANDATORY: your ENTIRE answer must be in ${langName} (language code: ${language}).`;

  const stepsText = steps
    .map((s, i) => {
      const parts = [`${i + 1}. ${s.title}`];
      if (s.expression) parts.push(`   Expression: ${s.expression}`);
      if (s.result) parts.push(`   Result: ${s.result}`);
      return parts.join('\n');
    })
    .join('\n');

  const inputsText = Object.entries(vals)
    .map(([k, v]) => `${k} = ${v}`)
    .join(', ');

  const userContent = [
    `Formula: ${entry.name} → ${entry.formula}`,
    entry.note ? `Note: ${entry.note}` : '',
    inputsText ? `Entered values: ${inputsText}` : '',
    '',
    'Deterministic solution steps:',
    stepsText,
    '',
    question
      ? `Student's question: ${question}`
      : 'Explain this formula and the steps above to the student stage by stage.',
  ]
    .filter(Boolean)
    .join('\n');

  return callNavigationAssistant(
    [
      { role: 'system', content: system },
      { role: 'user', content: userContent },
    ],
    language,
  );
}

/**
 * "Lessons Beta" — the embedded adaptive lesson tutor.
 *
 * The tutor is grounded in the CONTENT of the lesson currently open (lessonText
 * is sent as context) and teaches to the student's level. To reduce
 * hallucination it is asked to stay within the given content plus established
 * maritime standards, and to point at the source when unsure. Every call goes
 * through the existing `gemini-chat` edge function (callGemini).
 */
export type TutorLevel = 'basit' | 'normal' | 'ileri';

export interface LessonTutorContext {
  topicTitle: string;
  /** Summary of the lesson's section texts (read-only, from the existing narrative). */
  lessonText: string;
  level?: TutorLevel;
}

const LEVEL_GUIDANCE: Record<TutorLevel, string> = {
  basit:
    'Student level: BASIC. Explain in very plain language, with everyday analogies and short sentences. Avoid heavy terminology; define it immediately if you use it.',
  normal:
    'Student level: INTERMEDIATE. Explain at a balanced technical depth suited to a maritime academy student.',
  ileri:
    'Student level: ADVANCED. Explain at a level suited to an officer candidate, citing rules/standards and focusing on practical shipboard application.',
};

export async function askLessonTutor(
  context: LessonTutorContext,
  messages: AIMessage[],
  language: string = 'en',
): Promise<string> {
  const langName = getLanguageDisplayName(language);
  const level = context.level ?? 'normal';

  const system = `You are an experienced instructor at a maritime academy (deck and engine subjects). You are currently teaching the student the topic "${context.topicTitle}".

YOUR TASK: help the student grasp this topic BETTER THAN IN CLASS; connect the theory to shipboard practice.

RULES:
- Base your answers PRIMARILY on the LESSON CONTENT given below and on established maritime standards (COLREG, SOLAS, STCW, IMO publications).
- If you are asked something that is not in the lesson content and you are unsure, do NOT invent it; say "this is not in the lesson content" and point to the correct source/publication.
- Be accurate when giving a number, rule number or formula; say so if you are unsure.
- ${LEVEL_GUIDANCE[level]}
- Keep it short and instructive: use bullet points where useful. Where possible, make a practical link in the form of "what this means on board".
- MANDATORY: your ENTIRE answer must be in ${langName} (language code: ${language}).

LESSON CONTENT ("${context.topicTitle}"):
${context.lessonText}`;

  try {
    return await callGemini([{ role: 'system', content: system }, ...messages]);
  } catch (e) {
    if (e instanceof AIAccessError) return e.message;
    console.error('Lesson tutor AI error:', e);
    return 'The tutor assistant is unavailable right now. Please try again shortly. In the meantime you can review the lesson text and the worked examples.';
  }
}
