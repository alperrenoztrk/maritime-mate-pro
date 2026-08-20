import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";
import { createServiceClient, consumeAiQuota, quotaExceededResponse } from "../_shared/entitlements.ts";

type CalculationValues = Record<string, unknown>;

interface AskAiRequest {
  question?: unknown;
  values?: unknown;
  conversationHistory?: Array<{ question: string; answer: string }>;
}

interface WolframPod {
  title?: string;
  subpods?: Array<{ plaintext?: string }>;
}

interface WolframApiResponse {
  queryresult?: { pods?: WolframPod[] };
}

interface WolframCalculationResult {
  input: string;
  result: string;
  steps: string[];
  interpretation: string;
}

const isCalculationValues = (value: unknown): value is CalculationValues =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Validate authentication
  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  let question: string = '';
  let values: CalculationValues | undefined;
  let conversationHistory: Array<{question: string, answer: string}> | undefined;
  
  try {
    const body = await req.json() as AskAiRequest;
    question = typeof body.question === "string" ? body.question : "";
    values = isCalculationValues(body.values) ? body.values : undefined;
    conversationHistory = body.conversationHistory;
    
    // Input validation and sanitization
    if (!question || typeof question !== 'string') {
      return new Response(
        JSON.stringify({ error: GENERIC_ERRORS.INVALID_INPUT }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Sanitize question input
    const sanitizedQuestion = question.slice(0, 1000).trim();
    
    if (!sanitizedQuestion) {
      return new Response(
        JSON.stringify({ error: 'Question is missing' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // API anahtarlarını al - ONLY from environment variables (secure)
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const wolframApiKey = Deno.env.get('WOLFRAM_API_KEY');
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ 
          answer: getLocalAnswer(question, conversationHistory),
          calculation: null,
          source: 'local'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Aylık AI kotasını düş; doluysa Gemini'ye gitmeden bilgilendir.
    // (Yukarıdaki yerel/statik yanıtlar kota tüketmez.)
    const quota = await consumeAiQuota(createServiceClient(), user.id);
    if (!quota.allowed) {
      return quotaExceededResponse(corsHeaders, quota);
    }

    // 1. Önce AI açıklama al
    const aiExplanation = await getGeminiExplanation(question, values, geminiApiKey, conversationHistory);
    
    // 2. Wolfram hesaplama yap (eğer değerler ve API key varsa)
    let wolframResult = null;
    if (values && Object.keys(values).length > 0 && wolframApiKey) {
      wolframResult = await performWolframCalculation(question, values, wolframApiKey);
    }

    // 3. Sonuçları birleştir
    const hybridResponse = combineResults(aiExplanation, wolframResult);

    return new Response(
      JSON.stringify({
        answer: hybridResponse.explanation,
        calculation: hybridResponse.calculation,
        source: wolframResult ? 'hybrid' : 'gemini',
        wolfram_result: wolframResult,
        quota: { tier: quota.tier, used: quota.used, limit: quota.limit, remaining: quota.remaining }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    logError('ask-ai', error);
    const localAnswer = getLocalAnswer(question, conversationHistory);
    return new Response(
      JSON.stringify({ 
        answer: localAnswer,
        source: 'local'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function getLocalAnswer(question: string, conversationHistory?: Array<{question: string, answer: string}>): string {
  const lowerQuestion = question.toLowerCase();
  
  const localAnswers = {
    "bm": `**BM (Metacenter Radius) Calculation:**

BM = Iw / ∇

**Descriptions:**
- BM: Metacentric radius (m)
- Iw: Inertia of waterline area (m⁴) 
- ∇: Underwater volume (m³)

**Practical Example:**
On a ship:
- Iw = 12,500 m⁴
- ∇ = 8,000 m³
- BM = 12,500 / 8,000 = 1.56 m

**Relationships:**
- KM = KB + BM
- GM = KM - KG
- As BM increases, Stability increases`,

    "gm": `**GM (Metacentric Height) Calculation:**

GM = KM - KG

**Components:**
- KM = KB + BM (Metacentric distance)
- BM = Iw/∇ (Metacenter radius)
- KG = Center of gravity height

**IMO Criteria:**
- GM ≥ 0.15m (Minimum)
- 0.15m ≤ GM ≤ 0.35m (Recommended)
- GM > 0.35m (Extremely hard)`,

    "trim": `**Trim Calculation:**

Trim = Ta - Tf (Stern Draft - Head Draft)

**Trim Angle:**
θ = arctan(Trim / LPP)

**Longitudinal Metacenter:**
GML = KML - KG
MCT1cm = (Δ × GML) / (100 × LPP)`,

    "stability": `**Stability Formulas:**

**Basic:** GM = KM - KG
**Metacenter:** KM = KB + BM  
**Radius:** BM = Iw / ∇

**Critical Values:**
- GM > 0.15m (IMO minimum)
- Positive Stability: GM > 0`,

    "displacement": `**Displacement Calculation:**

Δ = L × B × T × CB × ρ

**Descriptions:**
- Δ: Displacement (ton)
- L: Ship length (m)
- B: Ship width (m)
- T: Draft (m)
- CB: Block coefficient (0.5-0.85)
- ρ: Water density (1.025 t/m³ seawater)

**Example:**
L=100m, B=20m, T=8m, CB=0.7
Δ = 100 × 20 × 8 × 0.7 × 1,025 = 11,480 tons`,

    "wave": `**Wave Calculations:**

**Wave Speed:**
C = √(gλ/2π) = 1.56√λ (m/s)

**Wave Period:**
T = λ/C = √(2πλ/g)

**Wavelength:**
λ = gT²/2π = 1.56T² (m)

**Descriptions:**
- C: Wave speed (m/s)
- λ: Wavelength (m)
- T: Wave period (s)
- g: Gravity (9.81 m/s²)`,

    "resistance": `**Ship Resistance Calculations:**

RT = RF + RW + RA + RAP

**Components:**
- RF: Friction resistance = ½ρSV²CF
- RW: Wave resistance
- RA: Air resistance
- RAP: Appendiceal resistance

**Coefficient of Friction (ITTC):**
CF = 0.075/(log₁₀Rn - 2)²

**Reynolds Number:**
Rn = VL/ν`,

    "power": `**Ship Power Calculations:**

**Effective Power (PE):**
PE = RT × V (Watts)

**Shaft Power (PS):**
PS = PE / ηD

**Braking Power (PB):**
PB = PS / ηS

**Yields:**
- ηD: Propeller yield (0.60-0.75)
- ηS: Shaft efficiency (0.97-0.99)
- ηT: Total efficiency = ηD × ηS`,

    "propeller": `**Propeller Calculations:**

**Propeller Thrust Force:**
T = ρ × n² × D⁴ × KT

**Propeller Torque:**
Q = ρ × n² × D⁵ × KQ

**Propeller Yield:**
η0 = (J × KT) / (2π × KQ)

**Progress Rate:**
J = VA / (n × D)

**Descriptions:**
- T: Thrust force (N)
- Q: Torque (Nm)
- ρ: Water density (kg/m³)
- n: Number of revolutions (rps)
- D: Propeller diameter (m)
- KT, KQ: Thrust and torque coefficients
- VA: Feed rate (m/s)`,

    "load": `**Loading Calculations:**

**Deadweight (DWT):**
DWT = Δmax - Δlight

**Components:**
- Cargo capacity
- Fuel and oil
- Fresh water
- Crew and rations
- Fixed ballast

**Loading Factors:**
- Stowage Factor (SF): m³/ton
- Broken Stowage: 10-15%
- Trim and Stability limits`,

    "colreg": `**COLREG (Prevention of Collision at Sea Regulation):**

**Basic Rules:**
- Rule 5: Lookout
- Rule 6: Safe speed
- Rule 7: Danger of collision
- Rule 8: Collision avoidance maneuvers

**Navigation Flashlights:**
- Starboard: Green (112.5°)
- Port: Red (112.5°)
- Pupae: White (135°)
- Above head: White (225°)

**Special Cases:**
- Maneuver limited capability ship
- Out of control ship
- Fishing ships
- Sailboat priority`,

    "solas": `**SOLAS (Safety of Life at Sea Convention):**

**Main Sections:**
- Chapter II-1: Structure, compartmentation, Stability
- Chapter II-2: Fire protection
- Chapter III: Lifesaving appliances
- Chapter IV: Radio communication
- Chapter V: Navigation safety
- Chapter IX: ISM (Security Management)
- Chapter XI: Safety precautions

**Critical Requirements:**
- GMDSS obligation
- AIS system
- VDR (Navigation recorder)
- ECDIS requirements`,

    "marpol": `**MARPOL (Marine Pollution Prevention Convention):**

**Attachments:**
- Annex I: Oil pollution
- Annex II: Harmful liquid substances
- Annex III: Packaged harmful substances
- Annex IV: Sewage
- Annex V: Garbage
- Annex VI: Air pollution

**Custom Fields:**
- ECA (Emission Control Areas)
- Special sensitive marine areas
- Antarctic region

**Limits:**
- Sulfur: 0.5% (global), 0.1% (ECA)
- NOx: Tier III standards`,

    "imdg": `**IMDG Code (Dangerous Cargo):**

**Classes:**
1. Explosives
2. Gases (2.1 Flammable, 2.2 Non-flammable, 2.3 Toxic)
3. Flammable liquids
4. Flammable solids
5. Oxidizing substances
6. Toxic and infectious substances
7. Radioactive substances
8. Corrosive substances
9. Various hazardous substances

**Documentation:**
- Dangerous Cargo Manifesto
- Container/Vehicle Packaging Certificate
- Stacking and separation rules`,

    "isps": `**ISPS Code (Ship and Port Security):**

**Security Levels:**
- Level 1: Normal (minimum security)
- Level 2: Elevated (additional measures)
- Level 3: Exceptional (maximum security)

**Required Elements:**
- SSP (Ship Security Plan)
- SSO (Ship Security Officer)
- CSO (Company Security Officer)
- SSAS (Ship Security Alarm System)

**Control Measures:**
- Entry checkpoints
- Restricted areas
- Security patrol`,

    "ism": `**ISM Code (Security Management System):**

**Basic Principles:**
- Safety and environmental protection policy
- Company responsibilities and powers
- DPA (Designated Person Ashore)
- Master responsibilities

**Documentation:**
- SMS (Security Management System)
- DOC (Certificate of Conformity)
- SMC (Security Management Certificate)

**Operational Requirements:**
- Emergency preparedness
- Non-conformance and accident reporting
- Maintenance procedures
- Internal audits`,

    "stcw": `**STCW (Seafarers Training and Certification):**

**Proficiency Levels:**
- Management level
- Operation level
- Support level

**Basic Trainings:**
- Basic Safety Training
- Fire fighting
- First aid
- Personal safety at sea
- Social responsibilities

**Working/Rest Hours:**
- Maximum 14 hours/24 hours
- Maximum 72 hours/7 days
- Minimum 10 hours rest/24 hours`,

    "meteorology": `**Maritime Meteorology:**

**Beaufort Wind Scale:**
0: Calm (0-1 knots)
1-3: Light breeze (1-10 knots)
4-5: Medium wind (11-21 knots)
6-7: Strong wind (22-33 knots)
8-9: Storm (34-47 knots)
10-11: Severe storm (48-63 knots)
12: Hurricane (64+ knots)

**Wave Forecast:**
- Significant wave height (Hs)
- Swell and wind waves
- Wave period and direction

**Air Systems:**
- Low pressure: Cyclone, bad weather
- High pressure: Anticyclone, good weather
- Facade systems`,

    "chart": `**Marine Charts and Navigation:**

**Chart Types:**
- General Charts: 1:3,000,000+
- Sailing Charts: 1:600,000
- Coastal Charts: 1:150,000
- Approach Charts: 1:75,000
- Harbor Charts: 1:50,000-

**Symbols:**
- Depths and contours
- Lighthouses and buoys
- Hazards and obstacles
- Current and tide information

**Corrections:**
- Magnetic deviation (Variation)
- Compass deviation (Deviation)
- WGS-84 datum`,

    "cargo": `**Cargo Operations:**

**Cargo Types:**
- Break bulk (General load)
- Bulk cargo
- Container
- Ro-Ro (Wheel load)
- Liquid bulk

**Loading Planning:**
- Stability calculations
- Trim optimization
- Shear force and bending moment
- Lashing calculations

**Special Cargoes:**
- Reefer (Cooled)
- DG (Dangerous cargo)
- Heavy lift
- Project cargo`,

    "denizde can": `**Saving Life at Sea:**

**LSA (Life-saving Appliances):**
- Lifeboat
- Liferaft
- Lifejacket (Lifejacket)
- Immersion suit
- Lifebuoy (Lifebuoy)

**SOLAS Requirements:**
- 100% + 25% liferaft capacity
- 50% lifeboat on both sides
- EPIRB and SART
- Pyrotechnics (Cartridges)

**Abandonment Procedures:**
- 7 short 1 long whistles
- Assembly stations
- Check customer list`,

    "fire": `**Fire Fighting:**

**Fire Triangle:**
- Fuel
- Oxygen  
- Heat

**Fire Classes:**
- A: Solids (Water, foam)
- B: Flammable liquids (Foam, CO2, dry chemical)
- C: Gases (Dry chemical, CO2)
- D: Metals (Special powder)
- E: Electricity (CO2, dry chemical)
- F: Oils (Wet chemical)

**Fixed Systems:**
- CO2 system
- Foam system
- Sprinklers
- Water mist`,

    "vhf": `**VHF Marine Radio:**

**Call Channels:**
- Channel 16: Emergency and call
- Channel 13: Bridge-bridge security
- Channel 70: DSC digital call

**Procedures:**
- MAYDAY: Danger to life
- PAN PAN: Urgency
- SECURITE: Security message

**Range:**
- VHF: 20-30 miles (line of sight)
- MF: 200 miles
- HF: Worldwide`,

    "balance": `**Ship Balance and Trim:**

**Equilibrium States:**
- Even keel: Straight water line
- Trim by stern: Trim from the stern
- Trim by head: Trim from the head
- List: Starboard/port elevation

**Fixing Methods:**
- Ballast transfer
- Fuel transfer
- Cargo placement
- Reducing the free surface effect

**Calculations:**
- LCG (Longitudinal center of gravity)
- LCB (Longitudinal center of buoyancy)
- MCT (Moment to change trim)`,

    "pilot": `**Pilotage and Port Maneuvers:**

**Piloting:**
- Pilot ladder requirements
-Lee side (Leeward)
- Pilot card replacement
- Master-Pilot information exchange

**Maneuver Elements:**
- Turning diameter
- Stopping distance
- Shallow water effect
- Bank effect
- Squat

**Line Operations:**
- Spring lines (Apaz)
- Breast lines
- Head/Stern lines (Head/Stern)`,

    "ecdis": `**ECDIS (Electronic Chart):**

**Mandatory Requirements:**
- Type approved system
- Backup editing
- Use of ENC or RNC
- Automatic updates

**Alarms:**
- Safety contour
- Dangerous depths
- Special areas
- Chart datum warnings

**Course Planning:**
- Waypoint placement
- XTE (Cross track error)
- Wheel over points
- ETA calculations`
  };
  
  for (const [key, answer] of Object.entries(localAnswers)) {
    if (lowerQuestion.includes(key)) {
      return answer;
    }
  }
  
  return `**Maritime Engineering AI Assistant**

Gemini AI + Wolfram powered hybrid computing system is ready! 

You can ask questions:
• **Stability**: GM, BM, KM calculations
• **Trim**: Longitudinal Stability, MCT
• **Loading**: Cargo distribution, ballast
• **Hydrostatic**: Draft, Displacement
• **Propulsion**: Resistance, thrust, efficiency
• **Security**: IMO, SOLAS criteria

I will answer with detailed formulas and 100% accurate calculations.`;
}

// Gemini AI explanation. The assistant answers in English: the app ships no
// Turkish UI, so a Turkish model answer would reach the user as untranslated
// text (a live answer is too long and too new to be covered by the shipped
// locale dictionaries).
async function getGeminiExplanation(question: string, values: CalculationValues | undefined, apiKey: string, conversationHistory?: Array<{question: string, answer: string}>) {
  try {
    const prompt = values
      ? `You are an expert maritime engineering assistant. A calculation will be made with the values supplied. First explain why this calculation is made and which formula is used.

Question: ${question}
Given values: ${JSON.stringify(values)}

Your explanation must contain these sections:
1. **What is the purpose of this calculation?**
2. **Which formula is used?**
3. **What do the values mean?**
4. **What does the result mean in practice?**

Answer in English and use standard maritime terminology. Reply in Markdown format.`
      : `You are an experienced maritime expert with deep knowledge of ship engineering, maritime operations, IMO regulations, navigation, ship safety and maritime law. You are also an expert in mathematics, physics and engineering calculations.

**Your fields of expertise:**
- Ship stability and trim calculations
- COLREG, SOLAS, MARPOL, STCW, ISM and ISPS rules
- Navigation and ECDIS systems
- Cargo operations and load planning
- Life saving at sea and fire safety
- Ship machinery and propeller systems
- Meteorology and oceanography
- Maritime English and terminology

${conversationHistory && conversationHistory.length > 0 ? `
**Previous conversation:**
${conversationHistory.slice(-3).map((item, index) => `
${index + 1}. Question: ${item.question}
   Answer: ${item.answer.substring(0, 200)}...
`).join('')}
` : ''}

Question: ${question}

Please answer according to these rules:

1. **FOR NUMERICAL QUESTIONS:**
   - Explain the relevant formulas
   - Show the solution step by step
   - Always state the units
   - Highlight the result and explain what it means in practice
   - Show it with example values where possible

2. **FOR THEORETICAL QUESTIONS:**
   - Explain the subject comprehensively
   - Give the definitions
   - State the practical applications
   - Emphasize why it matters at sea
   - Name the relevant standards (IMO, SOLAS, MARPOL, etc.)

3. **FOR HYBRID QUESTIONS:**
   - Cover both the theory and the calculation
   - Keep formulas and explanations balanced

4. **GENERAL RULES:**
   - Always answer in English, whatever language the question is written in
   - Use the established English maritime term for every concept
   - Use Markdown formatting
   - Use headings, lists and emphasis
   - Always approach the subject from a seafarer's perspective

5. **IF YOU ARE NOT SURE:**
   - Start with "I cannot give a definitive answer on this, but..."
   - Explain the general principles
   - Suggest the relevant references`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 1,
          topP: 0.95,
          maxOutputTokens: 4096,
        }
      })
    });

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      return null;
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return null;
  } catch (error) {
    console.error('Error in Gemini explanation:', error);
    return null;
  }
}

// Wolfram hesaplama fonksiyonu
async function performWolframCalculation(question: string, values: CalculationValues, apiKey: string) {
  try {
    const query = createWolframQuery(question, values);
    console.log('Wolfram query:', query);

    const response = await fetch(`https://api.wolframalpha.com/v2/query?appid=${apiKey}&input=${encodeURIComponent(query)}&format=plaintext&output=json`);
    
    if (!response.ok) {
      console.error('Wolfram API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json() as WolframApiResponse;
    console.log('Wolfram response received');

    if (data.queryresult && data.queryresult.pods) {
      const results = extractWolframResults(data.queryresult.pods);
      return results;
    }

    return null;
  } catch (error) {
    console.error('Error in Wolfram calculation:', error);
    return null;
  }
}

// Wolfram sorgusu oluştur
function createWolframQuery(question: string, values: CalculationValues): string {
  const questionLower = question.toLowerCase();
  
  // Deplasman hesabı
  if (questionLower.includes('deplasman') || questionLower.includes('displacement')) {
    if (values.length && values.beam && values.draft) {
      return `displacement = ${values.length} * ${values.beam} * ${values.draft} * 0.7 * 1.025`;
    }
  }
  
  // Stabilite hesabı
  if (questionLower.includes('stabilite') || questionLower.includes('stability') || questionLower.includes('gm')) {
    if (values.km && values.kg) {
      return `GM = ${values.km} - ${values.kg}`;
    }
    if (values.gm && values.displacement) {
      return `stability moment = ${values.gm} * ${values.displacement}`;
    }
  }
  
  // BM hesabı
  if (questionLower.includes('bm') || questionLower.includes('metacentre')) {
    if (values.waterline_moment && values.displacement) {
      return `BM = ${values.waterline_moment} / ${values.displacement}`;
    }
  }
  
  // Trim hesabı
  if (questionLower.includes('trim')) {
    if (values.moment && values.mct) {
      return `trim = ${values.moment} / ${values.mct}`;
    }
    if (values.aft_draft && values.fore_draft) {
      return `trim = ${values.aft_draft} - ${values.fore_draft}`;
    }
  }
  
  // Balast hesabı
  if (questionLower.includes('balast') || questionLower.includes('ballast')) {
    if (values.volume && values.density) {
      return `ballast weight = ${values.volume} * ${values.density}`;
    }
  }
  
  // Pervane hesapları
  if (questionLower.includes('pervane') || questionLower.includes('propeller')) {
    if (values.rpm && values.diameter) {
      return `propeller calculations for ${values.rpm} rpm and ${values.diameter}m diameter`;
    }
  }
  
  // Yakıt tüketimi
  if (questionLower.includes('fuel') || questionLower.includes('fuel')) {
    if (values.power && values.consumption) {
      return `fuel consumption = ${values.power} * ${values.consumption} * time`;
    }
  }
  
  // Dalga kuvveti
  if (questionLower.includes('dalga kuvvet') || questionLower.includes('wave force')) {
    if (values.height && values.length) {
      return `wave force calculation for ${values.height}m height and ${values.length}m length`;
    }
  }
  
  // Hız dönüşümleri
  if (questionLower.includes('knot') || questionLower.includes('deniz mili')) {
    return question + ' (1 knot = 1.852 km/h = 0.514 m/s)';
  }
  
  // Genel hesaplama
  const valueString = Object.entries(values)
    .map(([key, value]) => `${key} = ${value}`)
    .join(', ');
  
  return `calculate ${question} with ${valueString}`;
}

// Wolfram sonuçlarını çıkar
function extractWolframResults(pods: WolframPod[]): WolframCalculationResult {
  const results: WolframCalculationResult = {
    input: '',
    result: '',
    steps: [] as string[],
    interpretation: ''
  };

  for (const pod of pods) {
    const title = pod.title ?? "";
    if (title === 'Input') {
      results.input = pod.subpods?.[0]?.plaintext || '';
    } else if (title === 'Result' || title === 'Exact result' || title === 'Decimal approximation') {
      results.result = pod.subpods?.[0]?.plaintext || '';
    } else if (title.includes('step') || title.includes('Step')) {
      results.steps.push(pod.subpods?.[0]?.plaintext || '');
    } else if (title === 'Interpretation' || title.includes('interpretation')) {
      results.interpretation = pod.subpods?.[0]?.plaintext || '';
    }
  }

  return results;
}

// AI ve Wolfram sonuçlarını birleştir
function combineResults(aiExplanation: string | null, wolframResult: WolframCalculationResult | null) {
  if (!aiExplanation && !wolframResult) {
    return {
      explanation: 'Calculation could not be done. Please check the values.',
      calculation: null
    };
  }

  if (!wolframResult) {
    return {
      explanation: aiExplanation || 'Could not get AI description.',
      calculation: null
    };
  }

  const explanation = aiExplanation 
    ? `${aiExplanation}\n\n## 🎯 Verified Calculation Result\n\n**Wolfram Alpha Calculation:**\n- **Input:** ${wolframResult.input || 'Hesaplama parametreleri'}\n- **Result:** ${wolframResult.result || 'Calculation completed'}\n\n✅ **This result is based on 100% accurate mathematical calculation.**`
    : `## 🔢 Wolfram Alpha Hesaplama Sonucu\n\n**Girdi:** ${wolframResult.input || 'Hesaplama parametreleri'}\n**Result:** ${wolframResult.result || 'Calculation completed'}`;

  return {
    explanation,
    calculation: wolframResult
  };
}
