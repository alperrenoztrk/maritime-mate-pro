import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";

const SYSTEM_PROMPT = `Sen Marine Expert uygulaması için bir AI kod üretici asistansın. 
Denizcilik hesaplamaları, tablolar, grafikler ve konu anlatımları için React/TypeScript bileşenleri üretiyorsun.

## Kurallar:
1. SADECE React fonksiyonel bileşeni üret
2. TypeScript kullan
3. Tailwind CSS kullan (semantic token'lar: bg-background, text-foreground, bg-primary, etc.)
4. shadcn/ui bileşenlerini kullan (Card, Button, Input, Label, etc.)
5. Grafikler için Recharts kullan
6. Animasyonlar için Framer Motion kullan
7. Kod TEMİZ ve OKUNAKLI olmalı
8. Denizcilik terminolojisi DOĞRU olmalı
9. Formüller DOĞRU olmalı

## Mevcut Scope (bunları import etmeden kullanabilirsin):
- React, useState, useEffect, useMemo, useCallback
- motion (framer-motion)
- Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- Button, Input, Label, Slider, Select, Tabs, Badge
- LineChart, BarChart, PieChart, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, Bar, Pie, Area
- Calculator, Anchor, Ship, Navigation, Compass, Map, Waves

## Denizcilik Formülleri:
- GM = KM - KG (Metacentric Height)
- GZ = GM × sin(θ) (Righting Lever - küçük açılar için)
- Trim = (Aft Draft - Fwd Draft) (Trim hesabı)
- TPC = (Awl × ρ) / 100 (Tonnes Per Centimetre)
- MTC = (Δ × GML) / (100 × L) (Moment to Change Trim)
- Displacement = L × B × T × Cb × ρ
- Great Circle Distance = 60 × arccos(sin(lat1)×sin(lat2) + cos(lat1)×cos(lat2)×cos(dlon))

## Çıktı Formatı:
Önce kısa bir açıklama yaz, sonra \`\`\`tsx ile kod bloğu başlat.
Kod bloğu SADECE React bileşeni içermeli, import ifadeleri OLMAMALI.
Bileşen adı açıklayıcı olmalı (örn: GMCalculator, GreatCircleChart).`;

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
    fullPrompt += `\n\nBileşen tipi: ${context.componentType}`;
  }
  if (context?.category) {
    fullPrompt += `\nKategori: ${context.category}`;
  }
  if (context?.existingCode) {
    fullPrompt += `\n\nMevcut kod (düzenle):\n\`\`\`tsx\n${context.existingCode}\n\`\`\``;
  }

  return fullPrompt;
}

function detectComponentType(prompt: string, code?: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('hesapla') || lowerPrompt.includes('formül') || lowerPrompt.includes('calculator')) {
    return 'calculation';
  }
  if (lowerPrompt.includes('grafik') || lowerPrompt.includes('chart') || lowerPrompt.includes('diagram')) {
    return 'chart';
  }
  if (lowerPrompt.includes('tablo') || lowerPrompt.includes('table') || lowerPrompt.includes('liste')) {
    return 'table';
  }
  if (lowerPrompt.includes('konu') || lowerPrompt.includes('anlatım') || lowerPrompt.includes('açıklama')) {
    return 'topic';
  }
  if (lowerPrompt.includes('animasyon') || lowerPrompt.includes('animation') || lowerPrompt.includes('hareket')) {
    return 'animation';
  }
  if (lowerPrompt.includes('form') || lowerPrompt.includes('giriş') || lowerPrompt.includes('input')) {
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
  if (lowerPrompt.includes('güvenlik') || lowerPrompt.includes('safety') || lowerPrompt.includes('solas') || lowerPrompt.includes('marpol')) {
    return 'safety';
  }
  if (lowerPrompt.includes('yük') || lowerPrompt.includes('cargo') || lowerPrompt.includes('kargo') || lowerPrompt.includes('stowage')) {
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
