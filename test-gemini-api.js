// Test script for Gemini API
// Usage: GEMINI_API_KEY=<your-key> node test-gemini-api.js
// The key is intentionally NOT hardcoded — never commit real API keys.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGeminiAPI() {
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY ortam değişkeni tanımlı değil.');
    console.error('   Kullanım: GEMINI_API_KEY=<anahtar> node test-gemini-api.js');
    return false;
  }

  try {
    console.log('🧪 Testing Gemini 2.0 Flash API...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Maritime mühendisliğinde GM hesaplaması nedir? Kısa bir açıklama yap."
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API Çalışıyor!');
    console.log('📝 Yanıt:', data.candidates[0]?.content?.parts[0]?.text || 'Yanıt alınamadı');
    console.log('📊 Token kullanımı:', data.usageMetadata);

    return true;
  } catch (error) {
    console.error('❌ API Hatası:', error.message);
    return false;
  }
}

testGeminiAPI();
