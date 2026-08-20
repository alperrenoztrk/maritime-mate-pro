export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  images?: string[]; // Base64 encoded images
}

import { supabase } from '@/integrations/supabase/safeClient';
import type { CalcStep, CourseEntry } from '@/data/courseContent/types';

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
    return new AIAccessError('Yapay zekâ asistanını kullanmak için giriş yapmalısınız.', 'AUTH_REQUIRED');
  }
  if (context.status === 429) {
    try {
      const body = await context.clone().json();
      if (body?.code === 'AI_QUOTA_EXCEEDED') {
        return new AIAccessError(
          'Bu ayki yapay zekâ kullanım hakkınız doldu. Pro paket ile aylık kotanızı artırabilirsiniz (Ayarlar → Mariner\'s Book Pro).',
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
        '🌊 Weather Fax Frekansları:',
        '→ ALRS Volume 3 (Radio Weather Services)',
        '• Tüm meteorolojik radyo istasyonlarının frekans bilgileri',
        '• Yayın programları ve teknik detaylar',
        '• IMO tarafından onaylanmış resmi kaynak'
      ].join('\n');
    }
    
    if (last.includes('solas') || last.includes('güvenlik')) {
      return [
        '⚓ SOLAS Konvansiyonu:',
        '→ IMO SOLAS 2020 Edition + Amendments',
        '• Denizde İnsan Hayatının Güvenliği',
        '• Tüm güvenlik prosedürleri ve ekipmanları',
        '• Zorunlu kontrol listeleri'
      ].join('\n');
    }
    
    if (last.includes('marpol') || last.includes('kirlilik')) {
      return [
        '🛢️ MARPOL Konvansiyonu:',
        '→ IMO MARPOL 73/78 Consolidated Edition',
        '• Gemilerden Kaynaklanan Kirlilik Önleme',
        '• Annex I-VI detayları',
        '• Oil Record Book gereksinimleri'
      ].join('\n');
    }
    
    return [
      '📚 Maritime Regulations Assistant - Mark',
      'Hangi konuda bilgi arıyorsunuz?',
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
        '⏱️ ETA Hesaplamaları:',
        '• Temel: T = Mesafe(nm) ÷ Hız(kn) saat',
        '• Akıntılı: SOG = √(V² + C² + 2VC cos α)',
        '• Hava faktörü: Lehte 0.90-0.95, Aleyhte 1.10-1.25',
        'Örn: 240nm, 12kn → 20 saat; ETD 08:00 → ETA 04:00+1d'
      ].join('\n');
    }

    if (last.includes('büyük daire') || last.includes('great circle') || last.includes('gc')) {
      return [
        '🧭 Büyük Daire (Great Circle):',
        '• Mesafe: d = arccos(sin φ₁ sin φ₂ + cos φ₁ cos φ₂ cos Δλ) × 3437.747nm',
        '• İlk Kurs: C₁ = arctan2(sin Δλ cos φ₂, cos φ₁ sin φ₂ - sin φ₁ cos φ₂ cos Δλ)',
        '• En kısa mesafe ama değişken kurs'
      ].join('\n');
    }

    if (last.includes('rhumb') || last.includes('loxodrome') || last.includes('sabit kurs')) {
      return [
        '🧭 Rhumb Line (Loxodrome):',
        '• Mesafe: d = 60√[(Δφ)² + (q×Δλ)²]',
        '• Kurs: C = arctan(Δλ/Δq) - sabit kurs',
        '• q = log(tan(45°+φ₂/2) / tan(45°+φ₁/2)) / Δφ'
      ].join('\n');
    }

    if (last.includes('plane') || last.includes('düzlem')) {
      return [
        '🧭 Plane Sailing (Düzlem Seyri):',
        '• DLat = 60(φ₂-φ₁) deniz mili',
        '• Dep = 60(λ₂-λ₁) × cos φₘ',
        '• Mesafe: d = √(DLat² + Dep²)',
        '• Kurs: C = arctan(Dep/DLat)',
        '• Kısa mesafeler için (<600nm) ideal'
      ].join('\n');
    }

    if (last.includes('akıntı') || last.includes('current') || last.includes('leeway')) {
      return [
        '🌊 Akıntı Üçgeni & Leeway:',
        '• SOG = √(V² + C² + 2VC cos α)',
        '• CA = arcsin((C × sin β) / V)',
        '• CTS = İstenen Kurs ± CA',
        '• Leeway: Rüzgar etkisi düzeltmesi'
      ].join('\n');
    }

    if (last.includes('cpa') || last.includes('tcpa') || last.includes('arpa') || last.includes('çatışma')) {
      return [
        '📡 ARPA: CPA/TCPA Hesabı:',
        '• CPA = Range × sin(RelBrg - RelCourse)',
        '• TCPA = Range × cos(RelBrg - RelCourse) ÷ RelSpeed',
        '• Risk: CPA < 0.5nm VE TCPA < 6dk',
        '• Rel Speed = √[Vt² + Vo² - 2VtVo cos(Ct-Co)]'
      ].join('\n');
    }

    if (last.includes('pusula') || last.includes('compass') || last.includes('varyasyon') || last.includes('deviayon')) {
      return [
        '🧭 Pusula Düzeltmeleri:',
        '• True = Compass + Variation + Deviation + Gyro Error',
        '• TVMDC kuralı: T = M + Var, M = C + Dev',
        '• Doğu +, Batı - (East add, West subtract)',
        '• Total Error = Var + Dev + Gyro'
      ].join('\n');
    }

    if (last.includes('bearing') || last.includes('açı') || last.includes('mesafe')) {
      return [
        '📐 Bearing & Mesafe:',
        '• Doubling Angle: Dist = Run × sin(2A) ÷ sin(A)',
        '• Four Point (Bow & Beam): Dist = Run (45°→90° abeam)',
        '• Special Angle: Dist = 0.707 × Run (22.5°→45°)',
        '• Dip Horizon: d = 2.075√h nm',
        '• Radar Horizon: d = 2.35√h nm'
      ].join('\n');
    }

    if (last.includes('gelgit') || last.includes('tide') || last.includes('tidal')) {
      return [
        '🌊 Gelgit - 12\'de Bir Kuralı:',
        '• 1.saat: R/12, 2.saat: 3R/12, 3.saat: 5R/12',
        '• 4.saat: 6R/12, 5.saat: 9R/12, 6.saat: 11R/12',
        '• Yükseklik: h = Range/2 × [1 - cos(π×t/6)]',
        '• Spring tide: Yeniay/Dolunay, Neap: İlk/Son dördün'
      ].join('\n');
    }

    if (last.includes('göksel') || last.includes('celestial') || last.includes('yıldız')) {
      return [
        '⭐ Göksel Seyir:',
        '• Sight Reduction: Hc = arcsin[sin L sin d + cos L cos d cos LHA]',
        '• Azimuth: Z = arccos[(sin d - sin L sin Hc) ÷ (cos L cos Hc)]',
        '• Intercept: I = Ho - Hc (+ towards, - away)',
        '• GHA Star = GHA♈ + SHA⋆'
      ].join('\n');
    }

    if (last.includes('dönme') || last.includes('turning') || last.includes('manevra')) {
      return [
        '🚢 Dönme Manevraları:',
        '• Tactical Diameter = 3.5 × Gemi Boyu',
        '• Advance = R × sin(Δφ/2)',
        '• Transfer = R × (1 - cos(Δφ/2))',
        '• ROT = 3438 × V ÷ R deg/min'
      ].join('\n');
    }

    if (last.includes('hava') || last.includes('weather') || last.includes('rüzgar') || last.includes('beaufort')) {
      return [
        '🌪️ Hava Durumu:',
        '• Beaufort → Rüzgar: V = 2√(B³) kn',
        '• Dalga Yüksekliği: h = 0.025 × V² m',
        '• Leeway Açısı: θ = k × (Vrüzgar/Vgemi)²',
        '• Rüzgar Kuvveti: F = 0.00338 × V² × Alan'
      ].join('\n');
    }

    return [
      '🧭 Kapsamlı Seyir Asistanı - Tüm Formüller Hazır!',
      '',
      '📍 Pozisyon: Great Circle, Rhumb Line, Plane Sailing, Mercator',
      '⏱️ Zaman: ETA, Akıntı üçgeni, Hız hesapları',
      '📡 Radar: CPA/TCPA, ARPA, Çatışma riski',
      '🧭 Pusula: Var/Dev/Gyro düzeltmesi, Bearing hesabı',
      '🌊 Gelgit: 12\'de bir kuralı, Tidal stream',
      '⭐ Göksel: Sight reduction, Azimuth, Intercept',
      '🚢 Manevra: Turning circle, ROT, Advance/Transfer',
      '🌪️ Hava: Beaufort, Dalga, Leeway, Rüzgar kuvveti',
      '🆘 Acil: Search patterns, Rescue calculations',
      '',
      'Hangi hesaplama için yardım istiyorsunuz?'
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
      if (s.expression) parts.push(`   İfade: ${s.expression}`);
      if (s.result) parts.push(`   Result: ${s.result}`);
      return parts.join('\n');
    })
    .join('\n');

  const inputsText = Object.entries(vals)
    .map(([k, v]) => `${k} = ${v}`)
    .join(', ');

  const userContent = [
    `Formül: ${entry.name} → ${entry.formula}`,
    entry.note ? `Note: ${entry.note}` : '',
    inputsText ? `Girilen değerler: ${inputsText}` : '',
    '',
    'Deterministik çözüm adımları:',
    stepsText,
    '',
    question
      ? `Öğrencinin sorusu: ${question}`
      : 'Bu formülü ve yukarıdaki adımları öğrenciye aşama aşama açıkla.',
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
    'Öğrenci seviyesi: TEMEL. Çok sade bir dille, günlük benzetmelerle, kısa cümlelerle anlat. Ağır terimlerden kaçın; kullanırsan hemen tanımla.',
  normal:
    'Öğrenci seviyesi: ORTA. Denizcilik fakültesi öğrencisine uygun, dengeli teknik derinlikte anlat.',
  ileri:
    'Öğrenci seviyesi: İLERİ. Zabit adayına uygun, kural/standart atıflı ve pratik gemi uygulamasına odaklı anlat.',
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
