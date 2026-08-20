import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";

// Server-side code validation patterns (mirrors client-side sanitizer)
const DANGEROUS_PATTERNS = [
  // Storage access
  /localStorage\s*\./gi,
  /sessionStorage\s*\./gi,
  /indexedDB/gi,
  
  // Cookie access
  /document\s*\.\s*cookie/gi,
  
  // Dynamic code execution
  /\beval\s*\(/gi,
  /new\s+Function\s*\(/gi,
  /Function\s*\(/gi,
  
  // DOM manipulation that could be dangerous
  /document\s*\.\s*write/gi,
  /innerHTML\s*=/gi,
  /outerHTML\s*=/gi,
  /insertAdjacentHTML/gi,
  
  // Network requests
  /\bfetch\s*\(/gi,
  /XMLHttpRequest/gi,
  
  // Window manipulation
  /window\s*\.\s*location/gi,
  /window\s*\.\s*open/gi,
  /window\s*\[\s*['"]loc/gi, // Obfuscation: window['location']
  
  // Script injection
  /<\s*script/gi,
  /javascript\s*:/gi,
  
  // Dynamic imports
  /\bimport\s*\(/gi,
  /\brequire\s*\(/gi,
  
  // Prototype pollution
  /__proto__/gi,
  /prototype\s*\[/gi,
  /Object\s*\.\s*defineProperty/gi,
  
  // Obfuscation detection
  /window\s*\[\s*['"][^'"]+['"]\s*\]/gi, // window['anything']
  /\\u[0-9a-fA-F]{4}/g, // Unicode escapes like \u0065val
];

interface CodeValidation {
  isValid: boolean;
  violations: string[];
}

function validateGeneratedCode(code: string): CodeValidation {
  if (!code || typeof code !== 'string') {
    return { isValid: true, violations: [] };
  }

  const violations: string[] = [];

  for (const pattern of DANGEROUS_PATTERNS) {
    pattern.lastIndex = 0; // Reset for global patterns
    if (pattern.test(code)) {
      const patternDesc = pattern.source.substring(0, 30);
      violations.push(`Blocked pattern: ${patternDesc}`);
      pattern.lastIndex = 0;
    }
  }

  // Additional string-based checks for common obfuscation
  const lowerCode = code.toLowerCase();
  const obfuscationPatterns = [
    { pattern: "['lo'+'ca", desc: "String concatenation obfuscation" },
    { pattern: '["lo"+"ca', desc: "String concatenation obfuscation" },
    { pattern: "['eval']", desc: "Bracket notation for eval" },
    { pattern: '["eval"]', desc: "Bracket notation for eval" },
  ];

  for (const { pattern, desc } of obfuscationPatterns) {
    if (lowerCode.includes(pattern)) {
      violations.push(`Obfuscation detected: ${desc}`);
    }
  }

  return {
    isValid: violations.length === 0,
    violations: [...new Set(violations)]
  };
}

const SYSTEM_PROMPT = `You are an AI code generator assistant for the Mariner's Book app.
You produce React/TypeScript components for maritime calculations, tables, charts and subject explanations.

## Rules:
1. Produce ONLY a React function component
2. Use TypeScript
3. Use Tailwind CSS (semantic tokens: bg-background, text-foreground, bg-primary, etc.)
4. Use shadcn/ui components (Card, Button, Input, Label, etc.)
5. Use Recharts for charts
6. Use Framer Motion for animations
7. The code must be CLEAN and READABLE
8. The maritime terminology must be CORRECT
9. The formulas must be CORRECT
10. SECURITY: do NOT use dangerous APIs such as eval, fetch, localStorage or window.location

## Available scope (you can use these without importing them):
- React, useState, useEffect, useMemo, useCallback
- motion (framer-motion)
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Button, Input, Label, Slider, Select, Tabs, Badge
- LineChart, BarChart, PieChart, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Bar, Pie, Area
- Calculator, Anchor, Ship, Navigation, Compass, Map, Waves

## Maritime formulas:
- GM = KM - KG (Metacentric Height)
- GZ = GM × sin(θ) (Righting Lever - for small angles)
- Trim = (Aft Draft - Fwd Draft) (trim calculation)
- TPC = (Awl × ρ) / 100 (Tonnes Per Centimetre)
- MTC = (Δ × GML) / (100 × L) (Moment to Change Trim)
- Displacement = L × B × T × Cb × ρ
- Great Circle Distance = 60 × arccos(sin(lat1)×sin(lat2) + cos(lat1)×cos(lat2)×cos(dlon))

## Output format:
Write a short explanation first, then open a code block with \`\`\`tsx.
The code block must contain ONLY the React component, with NO import statements.
The component name must be descriptive (e.g. GMCalculator, GreatCircleChart).
Write every explanation and every user-visible string in the generated component in English.`;

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate authentication
  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const { prompt, context, stream } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      logError('agent-code-gen', 'API key not configured');
      return errorResponse(corsHeaders, 503, GENERIC_ERRORS.NOT_CONFIGURED);
    }

    // Validate prompt input
    if (!prompt || typeof prompt !== 'string' || prompt.length > 10000) {
      return errorResponse(corsHeaders, 400, GENERIC_ERRORS.INVALID_INPUT);
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildPrompt(prompt, context) }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        stream: stream || false,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      logError('agent-code-gen', `AI Gateway returned ${response.status}`);

      if (response.status === 429) {
        return errorResponse(corsHeaders, 429, GENERIC_ERRORS.RATE_LIMIT);
      }
      if (response.status === 402) {
        return errorResponse(corsHeaders, 402, 'Kredi limitiniz doldu.');
      }

      return errorResponse(corsHeaders, 500, GENERIC_ERRORS.SERVICE_ERROR);
    }

    if (stream) {
      return new Response(response.body, {
        headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Parse code from response
    const codeMatch = content.match(/```tsx\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trim() : undefined;
    const message = content.replace(/```tsx[\s\S]*?```/g, '').trim();

    // SERVER-SIDE CODE VALIDATION
    if (code) {
      const validation = validateGeneratedCode(code);
      if (!validation.isValid) {
        logError('agent-code-gen', `Code validation failed: ${validation.violations.join(', ')}`);
        return new Response(
          JSON.stringify({ 
            error: 'The generated code did not pass the security check',
            message: 'The code contains potentially dangerous patterns. Please rearrange your request.',
            violations: validation.violations.length
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Detect component type and category
    const componentType = detectComponentType(prompt, code);
    const category = detectCategory(prompt);

    return new Response(
      JSON.stringify({ message, code, componentType, category }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    logError('agent-code-gen', error);
    return errorResponse(corsHeaders);
  }
});

function buildPrompt(prompt: string, context?: { componentType?: string; category?: string; existingCode?: string }): string {
  let fullPrompt = prompt;

  if (context?.componentType) {
    fullPrompt += `\n\nComponent type: ${context.componentType}`;
  }
  if (context?.category) {
    fullPrompt += `\nKategori: ${context.category}`;
  }
  if (context?.existingCode) {
    // Validate existing code too
    const validation = validateGeneratedCode(context.existingCode);
    if (!validation.isValid) {
      fullPrompt += `\n\n[Current code could not be included for security reasons]`;
    } else {
      fullPrompt += `\n\nCurrent code (edit it):\n\`\`\`tsx\n${context.existingCode}\n\`\`\``;
    }
  }

  return fullPrompt;
}

function detectComponentType(prompt: string, code?: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('calculate') || lowerPrompt.includes('formula') || lowerPrompt.includes('calculator')) {
    return 'calculation';
  }
  if (lowerPrompt.includes('grafik') || lowerPrompt.includes('chart') || lowerPrompt.includes('diagram')) {
    return 'chart';
  }
  if (lowerPrompt.includes('tablo') || lowerPrompt.includes('table') || lowerPrompt.includes('list')) {
    return 'table';
  }
  if (lowerPrompt.includes('subject') || lowerPrompt.includes('narration') || lowerPrompt.includes('description')) {
    return 'topic';
  }
  if (lowerPrompt.includes('animasyon') || lowerPrompt.includes('animation') || lowerPrompt.includes('hareket')) {
    return 'animation';
  }
  if (lowerPrompt.includes('form') || lowerPrompt.includes('login') || lowerPrompt.includes('input')) {
    return 'form';
  }

  return 'calculation';
}

function detectCategory(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('stabilite') || lowerPrompt.includes('gm') || lowerPrompt.includes('metacentr') || lowerPrompt.includes('gz')) {
    return 'stability';
  }
  if (lowerPrompt.includes('seyir') || lowerPrompt.includes('navigasyon') || lowerPrompt.includes('rota') || lowerPrompt.includes('great circle')) {
    return 'navigation';
  }
  if (lowerPrompt.includes('security') || lowerPrompt.includes('safety') || lowerPrompt.includes('solas') || lowerPrompt.includes('marpol')) {
    return 'safety';
  }
  if (lowerPrompt.includes('load') || lowerPrompt.includes('cargo') || lowerPrompt.includes('kargo') || lowerPrompt.includes('stowage')) {
    return 'cargo';
  }
  if (lowerPrompt.includes('makine') || lowerPrompt.includes('engine') || lowerPrompt.includes('motor')) {
    return 'engine';
  }
  if (lowerPrompt.includes('hava') || lowerPrompt.includes('weather') || lowerPrompt.includes('meteoroloji')) {
    return 'weather';
  }

  return 'general';
}
