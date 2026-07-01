// Test script for Gemini API
// Usage: GEMINI_API_KEY=your_key node test-gemini-api.js
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY ortam değişkeni tanımlı değil.');
  console.error('   Kullanım: GEMINI_API_KEY=your_key node test-gemini-api.js');
  process.exit(1);
}

async function testGeminiAPI() {
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

// Test eski model ile karşılaştırma
async function testOldModel() {
  try {
    console.log('\n🧪 Testing old Gemini 1.5 Flash model...');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Test"
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 100,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('⚠️ Eski model hatası:', response.status, '-', errorText);
      return false;
    }

    console.log('✅ Eski model de çalışıyor');
    return true;
  } catch (error) {
    console.error('❌ Eski model hatası:', error.message);
    return false;
  }
}

// Ana test fonksiyonu
async function runTests() {
  console.log('🚀 Maritime Calculator - Gemini API Test\n');
  
  const newModelWorks = await testGeminiAPI();
  const oldModelWorks = await testOldModel();
  
  console.log('\n📋 Test Sonuçları:');
  console.log(`• Gemini 2.0 Flash: ${newModelWorks ? '✅ Çalışıyor' : '❌ Çalışmıyor'}`);
  console.log(`• Gemini 1.5 Flash: ${oldModelWorks ? '✅ Çalışıyor' : '❌ Çalışmıyor'}`);
  
  if (newModelWorks) {
    console.log('\n🎉 Maritime Calculator Gemini entegrasyonu başarılı!');
    console.log('💡 Artık AI asistanı tam olarak çalışacak.');
  } else {
    console.log('\n⚠️  API key veya bağlantı sorunu var.');
  }
}

// Script'i çalıştır
runTests();