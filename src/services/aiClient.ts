export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[]; // Base64 encoded images
}

import { supabase } from '@/integrations/supabase/safeClient';
import type { CalcStep, CourseEntry } from '@/data/courseContent/types';
import { requireConsent } from "@/lib/consent";

const LANGUAGE_NAMES: Record<string, string> = {
  'tr': 'Turkish',
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
  'hi': 'Turkey',
  'nl': 'Dutch',
  'sv': 'Sweden',
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
- Rhumb Line (Mercator sailing): tan C = DLong / DMP, d = DLat × sec C
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
- Risk of collision (COLREG Rule 7): judge CPA/TCPA against the limits in the Master's standing orders

🧭 COMPASS & BEARING:
- True Course: T = C + Dev + Var (East +, West -); T = Gyro course ± gyro error (Low +, High -)
- Doubling the Angle on the Bow: distance off at the second bearing = Run; distance off when abeam = Run × sin(2A)
- Four Point Bearing (Bow & Beam): Distance Off = Run (45° to 90° abeam)
- Special Angle Bearing: Distance Off = 0.707 × Run (22.5° to 45°)

🌊 TIDES & DISTANCE:
- Rule of Twelfths (cumulative rise): 1st hr: R/12, 2nd: 3R/12, 3rd: 6R/12, 4th: 9R/12, 5th: 11R/12, 6th: 12R/12
- Distance to the Sea Horizon: d = 2.075√h nm (h in metres)
- Radar Horizon: d ≈ 2.21√h nm (h in metres)
- Geographical Range of a Light: d = 2.075(√h_eye + √h_light) nm (h in metres)

⭐ CELESTIAL NAVIGATION:
- Sight Reduction: Hc = arcsin[sin L sin d + cos L cos d cos LHA]
- Azimuth: Z = arccos[(sin d - sin L sin Hc)/(cos L cos Hc)]
- Intercept: I = Ho - Hc (towards if +, away if -)
- GHA Star: GHA♈ + SHA⋆
- Meridian Altitude: zenith distance z = 90° - Ho; Lat = z + Dec (same name, Lat > Dec), z - Dec (contrary name), Dec - z (same name, Dec > Lat)
- Amplitude: A = arcsin(sin δ/cos φ)

🚢 SHIP HANDLING:
- Tactical Diameter: typically about 3–4 × ship's length; IMO manoeuvring standards limit: 5 × L
- Advance (on the turning circle, after the turn starts): A = R × sin Δφ (Δφ ≤ 90°)
- Transfer: T = R × (1 - cos Δφ)
- Rate of Turn: ROT = 0.955 × V/R deg/min (V in knots, R in nm)

🌪️ WEATHER & EMERGENCY:
- Beaufort to Wind: V ≈ 1.625 × B^1.5 knots
- Expanding Square Search: leg lengths S, S, 2S, 2S, 3S, 3S … (S = track spacing)
- Sector Search: 120° turns to starboard (IAMSAR)

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
 * Kota/oturum durumlarını yerel-yanıt fallback'inden ayırmak için özel hata.
 * `message` doğrudan kullanıcıya gösterilebilir.
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
    return new AIAccessError('You must log in to use the artificial intelligence assistant.', 'AUTH_REQUIRED');
  }
  if (context.status === 429) {
    try {
      const body = await context.clone().json();
      if (body?.code === 'AI_QUOTA_EXCEEDED') {
        return new AIAccessError(
          'You have used this month\'s AI allowance. The Pro package raises your monthly quota (Settings → Mariner\'s Book Pro).',
          'AI_QUOTA_EXCEEDED',
        );
      }
    } catch {
      // gövde JSON değilse genel akışa bırak
    }
  }
  return null;
}

// All AI calls go through edge function for security
async function callGemini(messages: AIMessage[]): Promise<string> {
  // Nothing leaves the device before explicit consent (KVKK; src/lib/consent.ts).
  await requireConsent('ai');
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
        '• Frequency information of all meteorological radio stations',
        '• Broadcast schedules and technical details',
        '• Official source approved by IMO'
      ].join('\n');
    }
    
    if (last.includes('solas') || last.includes('güvenlik')) {
      return [
        '⚓ SOLAS Convention:',
        '→ IMO SOLAS Consolidated Edition + amendments',
        '• International Convention for the Safety of Life at Sea',
        '• Construction, fire protection, life-saving appliances, radiocommunications and safety of navigation'
      ].join('\n');
    }
    
    if (last.includes('marpol') || last.includes('kirlilik')) {
      return [
        '🛢️ MARPOL Convention:',
        '→ IMO MARPOL Consolidated Edition',
        '• Prevention of Pollution from Ships',
        '• Annex I-VI details',
        '• Oil Record Book requirements'
      ].join('\n');
    }
    
    return [
      '📚 Maritime Regulations Assistant',
      'What are you looking for information on?',
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

    if (last.includes('eta') || last.includes('varış') || last.includes('zaman')) {
      return [
        '⏱️ ETA Calculations:',
        '• Basic: T (h) = Distance (nm) ÷ Speed (kn)',
        '• With current: SOG = √(V² + C² + 2VC cos α)',
        '• Weather factor: Pro 0.90-0.95, Con 1.10-1.25',
        'Ex: 240nm, 12kn → 20 hours; ETD 08:00 → ETA 04:00+1d'
      ].join('\n');
    }

    if (last.includes('büyük daire') || last.includes('great circle') || last.includes('gc')) {
      return [
        '🧭 Great Circle:',
        '• Distance: d = arccos(sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos Δλ) × 3437.747 nm',
        '• First Course: C₁ = arctan2(sin Δλ cos φ₂, cos φ₁ sin φ₂ - sin φ₁ cos φ₂ cos Δλ)',
        '• Shortest distance but variable course'
      ].join('\n');
    }

    if (last.includes('rhumb') || last.includes('loxodrome') || last.includes('sabit kurs')) {
      return [
        '🧭 Rhumb Line (Loxodrome):',
        '• Course: tan C = DLong ÷ DMP (constant course)',
        '• Distance: d = DLat × sec C',
        '• DMP = MP₂ − MP₁ (meridional parts tables)'
      ].join('\n');
    }

    if (last.includes('plane') || last.includes('düzlem')) {
      return [
        '🧭 Plane Sailing:',
        '• DLat = 60(φ₂-φ₁) nautical miles',
        '• Dep = 60(λ₂-λ₁) × cos φₘ',
        '• Distance: d = √(DLat² + Dep²)',
        '• Course: C = arctan(Dep/DLat)',
        '• Ideal for short distances (<600nm)'
      ].join('\n');
    }

    if (last.includes('akıntı') || last.includes('current') || last.includes('leeway')) {
      return [
        '🌊 Current Triangle & Leeway:',
        '• SOG = √(V² + C² + 2VC cos α)',
        '• CA = arcsin((C × sin β) / V)',
        '• CTS = Desired Course ± CA',
        '• Leeway: Wind effect correction'
      ].join('\n');
    }

    if (last.includes('cpa') || last.includes('tcpa') || last.includes('arpa') || last.includes('çatışma')) {
      return [
        '📡 ARPA: CPA/TCPA Calculation:',
        '• CPA = Range × sin(RelBrg - RelCourse)',
        '• TCPA = Range × cos(RelBrg - RelCourse) ÷ RelSpeed',
        '• Risk of collision (COLREG Rule 7): judge CPA/TCPA against the standing-order limits',
        '• Rel Speed = √[Vt² + Vo² - 2VtVo cos(Ct-Co)]'
      ].join('\n');
    }

    if (last.includes('pusula') || last.includes('compass') || last.includes('varyasyon') || last.includes('deviayon')) {
      return [
        '🧭 Compass Fixes:',
        '• True = Compass + Deviation + Variation; True = Gyro ± gyro error',
        '• TVMDC rule: T = M + Var, M = C + Dev',
        '• East +, West - (East add, West subtract)',
        '• Compass Error = Var + Dev'
      ].join('\n');
    }

    if (last.includes('bearing') || last.includes('açı') || last.includes('mesafe')) {
      return [
        '📐 Bearing & Distance:',
        '• Doubling Angle: distance at 2nd bearing = Run; abeam = Run × sin(2A)',
        '• Four Point (Bow & Beam): Dist = Run (45°→90° abeam)',
        '• Special Angle: Dist = 0.707 × Run (22.5°→45°)',
        '• Sea Horizon: d = 2.075√h nm (h in metres)',
        '• Radar Horizon: d ≈ 2.21√h nm (h in metres)'
      ].join('\n');
    }

    if (last.includes('gelgit') || last.includes('tide') || last.includes('tidal')) {
      return [
        '🌊 Tide - Rule of Twelfths:',
        '• Cumulative rise: 1st hour R/12, 2nd hour 3R/12, 3rd hour 6R/12',
        '• 4th hour 9R/12, 5th hour 11R/12, 6th hour 12R/12',
        '• Height: h = Range/2 × [1 - cos(π×t/6)]',
        '• Spring tide: New Moon/Full Moon, Neap: First/Last quarter'
      ].join('\n');
    }

    if (last.includes('göksel') || last.includes('celestial') || last.includes('yıldız')) {
      return [
        '⭐ Celestial navigation:',
        '• Sight Reduction: Hc = arcsin[sin L sin d + cos L cos d cos LHA]',
        '• Azimuth: Z = arccos[(sin d - sin L sin Hc) ÷ (cos L cos Hc)]',
        '• Intercept: I = Ho - Hc (+ towards, - away)',
        '• GHA Star = GHA♈ + SHA⋆'
      ].join('\n');
    }

    if (last.includes('dönme') || last.includes('turning') || last.includes('manevra')) {
      return [
        '🚢 Turning Maneuvers:',
        '• Tactical Diameter: typically 3–4 × ship length (IMO limit 5 L)',
        '• Advance = R × sin Δφ (Δφ ≤ 90°)',
        '• Transfer = R × (1 - cos Δφ)',
        '• ROT = 0.955 × V ÷ R deg/min (V kn, R nm)'
      ].join('\n');
    }

    if (last.includes('hava') || last.includes('weather') || last.includes('rüzgar') || last.includes('beaufort')) {
      return [
        '🌪️ Weather:',
        '• Beaufort → Wind: V ≈ 1.625 × B^1.5 kn'
      ].join('\n');
    }

    return [
      '🧭 Comprehensive Navigation Assistant - All Formulas Ready!',
      '',
      '📍 Position: Great Circle, Rhumb Line, Plane Sailing, Mercator',
      '⏱️ Time: ETA, Current triangle, Speed calculations',
      '📡 Radar: CPA/TCPA, ARPA, Collision risk',
      '🧭 Compass: Var/Dev/Gyro correction, Bearing calculation',
      '🌊 Tide: Rule of Twelfths, Tidal stream',
      '⭐ Celestial: Sight reduction, Azimuth, Intercept',
      '🚢 Manoeuvring: Turning circle, ROT, Advance/Transfer',
      '🌪️ Weather: Beaufort scale',
      '🆘 Emergency: Search patterns',
      '',
      'Which calculation do you need help with?'
    ].join('\n');
  }
}

/**
 * Bir formülün adım adım çözümünü yapay zekaya açıklatır.
 *
 * Deterministik adımlar (CalcStep[]) ve girilen değerler bağlam olarak
 * gönderilir; yapay zeka YENİ sayı üretmez, yalnızca mevcut doğru adımların
 * "why/how" yapıldığını öğretici biçimde açıklar. Tüm AI çağrıları mevcut
 * `gemini-chat` edge function üzerinden geçer (callNavigationAssistant).
 *
 * @param entry    İlgili formül girdisi (CourseEntry)
 * @param vals     Kullanıcının girdiği değerler
 * @param steps    Deterministik üretilmiş çözüm adımları
 * @param language Yanıt dili (kod, örn. "tr")
 * @param question İSTEĞE BAĞLI öğrenci sorusu; verilmezse genel açıklama istenir.
 */
export async function explainCalculation(
  entry: Pick<CourseEntry, 'name' | 'formula' | 'note'>,
  vals: Record<string, number>,
  steps: CalcStep[],
  language: string = 'en',
  question?: string,
): Promise<string> {
  const langName = getLanguageDisplayName(language);

  const system = `You are an experienced lecturer at a maritime faculty (deck and engine subjects: navigation, ship stability, meteorology, cargo operations, safety, thermodynamics, fluid mechanics, diesel engines, electrics and so on). Your task is to explain the given formula and the solution steps to the student in a PLAIN, clear and instructive way.

RULES:
- The numerical steps and results YOU ARE GIVEN ARE CORRECT; do NOT change them and do NOT invent new numbers.
- Explain WHY each step is taken (its reasoning) and what it means in seagoing practice.
- Keep it short: bullet points, no needless repetition. Define the symbols and units in the formula explicitly.
- Point out the common student mistakes (sign conventions, unit conversions, assumptions).
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
      : 'Explain this formula and the above steps to the student step by step.',
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
 * "Dersler Beta" — gömülü adaptif ders eğitmeni.
 *
 * Eğitmen, o anda açık olan dersin İÇERİĞİNE topraklanır (lessonText bağlam
 * olarak gönderilir) ve öğrencinin seviyesine göre öğretir. Halüsinasyonu
 * azaltmak için: verilen içerik + bilinen denizcilik standartları dışına
 * çıkmaması, emin olmadığında kaynağa yönlendirmesi istenir. Tüm çağrılar
 * mevcut `gemini-chat` edge function üzerinden geçer (callGemini).
 */
export type TutorLevel = 'basit' | 'normal' | 'ileri';

export interface LessonTutorContext {
  topicTitle: string;
  /** Dersin bölüm metinlerinin özeti (read-only, mevcut anlatımdan). */
  lessonText: string;
  level?: TutorLevel;
}

const LEVEL_GUIDANCE: Record<TutorLevel, string> = {
  basit:
    'Student level: BASIC. Explain it in very simple language, with daily analogies and short sentences. Avoid harsh terms; If you use it, identify it immediately.',
  normal:
    'Student level: INTERMEDIATE. Explain in a balanced technical depth suitable for a maritime faculty student.',
  ileri:
    'Student level: ADVANCED. Explain to the officer candidate in an appropriate manner, with reference to rules/standards and with a focus on practical ship application.',
};

export async function askLessonTutor(
  context: LessonTutorContext,
  messages: AIMessage[],
  language: string = 'en',
): Promise<string> {
  const langName = getLanguageDisplayName(language);
  const level = context.level ?? 'normal';

  const system = `You are an experienced lecturer at a maritime faculty (deck and engine subjects). You are currently teaching the student the subject "${context.topicTitle}".

YOUR TASK: to make the student understand this subject BETTER THAN AT SCHOOL, and to connect the theory to shipboard practice.

RULES:
- Base your answers PRIMARILY on the LESSON CONTENT given below and on the recognised maritime standards (COLREG, SOLAS, STCW, IMO publications).
- If something outside the lesson content is asked and you are not sure, do NOT invent it; say that it is not in this lesson content and point to the correct source/publication.
- Be accurate when giving a number, a rule number or a formula; say so if you are not sure.
- ${LEVEL_GUIDANCE[level]}
- Keep it short and instructive: bullet points where useful. Where possible make a practical link — "what this means on board".
- MANDATORY: your ENTIRE answer must be in ${langName} (language code: ${language}).

LESSON CONTENT ("${context.topicTitle}"):
${context.lessonText}`;

  try {
    return await callGemini([{ role: 'system', content: system }, ...messages]);
  } catch (e) {
    if (e instanceof AIAccessError) return e.message;
    console.error('Lesson tutor AI error:', e);
    return 'The tutor assistant cannot be reached right now. Please try again shortly. In the meantime you can work through the lesson text and the worked examples.';
  }
}
