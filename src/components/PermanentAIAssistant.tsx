import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Loader2, MessageCircle, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLanguageDisplayName } from "@/services/aiClient";

export const PermanentAIAssistant = () => {
  const { currentLanguage } = useLanguage();
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, answer: string, timestamp: number}>>([]);
  const [apiStatus, setApiStatus] = useState<'testing' | 'active' | 'error'>('testing');

  useEffect(() => {
    testGeminiConnection();
  }, []);

  const testGeminiConnection = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: {
          messages: [
            { role: "user", content: "Test maritime connection" }
          ]
        }
      });

      if (error) throw error;
      if (data?.text) {
        setApiStatus('active');
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      console.error('Connection Test Failed:', error);
      setApiStatus('error');
    }
  };

  const askGeminiAI = async (question: string): Promise<string> => {
    const langName = getLanguageDisplayName(currentLanguage);
    const maritimeContext = `You are an expert Maritime Engineering AI assistant.

Provide detailed, technical, and practical answers on maritime engineering, shipbuilding, seafaring, and ocean engineering topics.

Question: ${question}

Organize your response under these categories:
- **Core Explanation**
- **Formulas & Calculations**
- **Practical Application**
- **IMO/SOLAS Standards** (if applicable)
- **Safety Precautions** (if applicable)

CRITICAL: You MUST respond entirely in ${langName} (language code: ${currentLanguage}). Do not use any other language.`;

    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: {
          messages: [
            { role: "user", content: maritimeContext }
          ]
        }
      });

      if (error) {
        throw new Error(`API Error: ${error.message}`);
      }

      if (data?.text) {
        return data.text;
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  };

  const getLocalMaritimeAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    const localKnowledge = {
      "gm": `**GM (Metasantrik Yükseklik) Hesaplaması:**

**Temel Formül:** GM = KM - KG

**Bileşenler:**
- **KM**: Metasantır mesafesi (keel'den metasantıra)
- **KG**: Ağırlık merkezi yüksekliği (keel'den CoG'a)

**IMO Kriterleri:**
- **Minimum**: GM ≥ 0.15m
- **Optimal**: 0.15m ≤ GM ≤ 0.35m  
- **Aşırı sert**: GM > 0.35m

**Pratik Değerlendirme:**
- GM < 0.15m: ⚠️ Tehlikeli
- GM = 0.15-0.35m: ✅ İdeal
- GM > 0.35m: ⚡ Aşırı sert`,

      "stabilite": `**Gemi Stabilitesi Hesaplamaları:**

**Temel Formüller:**
1. **GM = KM - KG** (Metasantrik yükseklik)
2. **GZ = GM × sin(φ)** (Doğrultucu kol)
3. **BM = I / ∇** (Metasantrik yarıçap)

**IMO IS Code 2008 Kriterleri:**
- 0-30° alan: ≥ 3.151 m.derece
- 0-40° alan: ≥ 5.157 m.derece
- 30-40° alan: ≥ 1.719 m.derece
- Max GZ: ≥ 0.20m, açısı ≥ 30°`,

      "trim": `**Trim ve List Hesaplamaları:**

**Trim Formülü:**
Trim = Ta - Tf (Kıç su çekimi - Baş su çekimi)

**Trim Açısı:**
θ = arctan(Trim / LPP)

**MCT (Metre Trim Moment):**
MCT1cm = (Δ × GML) / (100 × LPP)

**Değerlendirme:**
- |θ| < 0.5°: Normal
- 0.5° ≤ |θ| < 2.0°: Kabul edilebilir
- |θ| ≥ 2.0°: Aşırı trim`,

      "navigasyon": `**Seyir Hesaplamaları:**

**Büyük Daire Mesafesi:**
d = arccos(sin φ₁ × sin φ₂ + cos φ₁ × cos φ₂ × cos(λ₂-λ₁))

**Rhumb Line:**
d = Δφ / cos(course)

**Hız Hesabı:**
V = S / T (knot = nm/hour)

**ETA Hesabı:**
ETA = ETD + (Distance / Speed)`
    };

    // Find matching knowledge
    for (const [key, answer] of Object.entries(localKnowledge)) {
      if (lowerQuestion.includes(key)) {
        return answer + "\n\n*🤖 Local Maritime AI Database*";
      }
    }

    return `**Maritime Mühendisliği AI Asistanı**

Size maritime mühendisliği konularında yardımcı olmaya hazırım!

**Uzmanlık Alanlarım:**
• **Stabilite**: GM, GZ, metasantır hesaplamaları
• **Seyir**: Mesafe, hız, rota hesaplamaları  
• **Hidrodinamik**: Direnç, güç, itme analizi
• **Yapısal**: Mukavemet, gerilme hesaplamaları
• **Güvenlik**: IMO, SOLAS kriterleri
• **Ekonomik**: Maliyet, yakıt optimizasyonu

Detaylı bir soru sorun, size özel hesaplama ve açıklamalar sunayım!

*🤖 Maritime AI Ready*`;
  };

  const handleAskAI = async () => {
    if (!question.trim()) {
      toast.error("Lütfen bir soru yazın");
      return;
    }

    setIsLoading(true);
    const currentQuestion = question.trim();
    setQuestion(""); // Clear input immediately

    try {
      let answer = "";
      
      if (apiStatus === 'active') {
        try {
          answer = await askGeminiAI(currentQuestion);
          toast.success("Yanıt hazırlandı");
        } catch (error) {
          console.warn('Primary source failed, using backup:', error);
          answer = getLocalMaritimeAnswer(currentQuestion);
          toast.info("Yanıt hazırlandı");
        }
      } else {
        answer = getLocalMaritimeAnswer(currentQuestion);
        toast.info("Yanıt hazırlandı");
      }

      setAiResponse(answer);
      
      // Add to conversation history
      const newEntry = {
        question: currentQuestion,
        answer,
        timestamp: Date.now()
      };
      setConversationHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10

    } catch (error) {
      console.error('Response Error:', error);
      toast.error("Yanıt alınamadı");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (quickQuestion: string) => {
    setQuestion(quickQuestion);
  };

  const quickQuestions = [
    "GM hesaplaması nasıl yapılır?",
    "Trim açısı formülü nedir?", 
    "Kararlılık kriterleri nelerdir?",
    "Büyük daire seyir hesabı",
    "SFOC hesaplama yöntemi",
    "Balast suyu hesaplamaları"
  ];

  return (
    <Card className="shadow-lg border-l-4 border-l-blue-500 mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-info" />
            <div>
              <CardTitle className="text-xl text-info-muted-foreground">Denizcilik Danışmanı</CardTitle>
              <CardDescription className="text-sm">
                Maritime mühendisliği uzman destek sistemi
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {apiStatus === 'active' && (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Çevrimiçi</span>
              </div>
            )}
            {apiStatus === 'error' && (
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Yerel</span>
              </div>
            )}
            {apiStatus === 'testing' && (
              <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Hazırlanıyor</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Questions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Hızlı Sorular:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left justify-start h-auto py-2 text-xs"
                onClick={() => handleQuickQuestion(q)}
                disabled={isLoading}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>

        {/* Question Input */}
        <div className="space-y-3">
          <Textarea
            placeholder="Maritime mühendisliği sorunuzu buraya yazın...

Örnek: 'Bir geminin GM değeri 0.25m. Bu değer güvenli mi?'"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isLoading}
          />
          
            <Button 
            onClick={handleAskAI}
            disabled={isLoading || !question.trim()}
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Hesaplanıyor...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                Danış
              </>
            )}
          </Button>
        </div>

        {/* AI Response */}
        {aiResponse && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-l-blue-400 cyberpunk:bg-gradient-to-r cyberpunk:from-gray-800 cyberpunk:to-gray-900 cyberpunk:border-l-yellow-400">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Uzman Yanıtı:
            </h4>
            <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {aiResponse}
            </div>
          </div>
        )}

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Son Sorular:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {conversationHistory.slice(0, 3).map((entry, index) => (
                <div key={index} className="text-xs p-2 bg-gray-50 rounded border-l-2 border-gray-300 dark:border-gray-600">
                  <div className="font-medium text-gray-600 dark:text-gray-400">S: {entry.question}</div>
                  <div className="text-gray-500 mt-1 truncate">
                    A: {entry.answer.substring(0, 100)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};