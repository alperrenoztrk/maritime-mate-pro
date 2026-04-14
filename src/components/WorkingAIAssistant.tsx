import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLanguageDisplayName } from "@/services/aiClient";
import { stripMarkdown } from "@/utils/cleanText";

export const WorkingAIAssistant = () => {
  const { currentLanguage } = useLanguage();
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, answer: string}>>([]);

  // Kapsamlı Maritime AI Knowledge Base
  const maritimeKnowledgeBase = {
    // Stabilite hesaplamaları
    "gm": `**GM (Metasantrik Yükseklik) Hesaplaması:**

**Formül:** GM = KM - KG

**Detaylı Açıklama:**
- **GM**: Metasantrik yükseklik (metre)
- **KM**: Metasantır mesafesi (keel'den metasantıra)
- **KG**: Ağırlık merkezi yüksekliği (keel'den CoG'a)

**IMO Kriterleri:**
- **Minimum GM**: ≥ 0.15m
- **Optimal aralık**: 0.15m - 0.35m
- **Aşırı sert**: > 0.35m (konfor problemi)

**Pratik Değerlendirme:**
- GM < 0.15m: Tehlikeli (stabilite yetersiz)
- GM = 0.15-0.35m: İdeal (güvenli ve konforlu)
- GM > 0.35m: Aşırı sert (denizcilik zorlaşır)

**Düzeltme Yöntemleri:**
- GM düşükse: Balast ekle, yük merkezini düşür
- GM yüksekse: Balast azalt, yük merkezini yükselt`,

    "stabilite": `**Gemi Stabilitesi - Kapsamlı Analiz:**

**Temel Stabilite Formülleri:**
1. **GM = KM - KG** (Metasantrik yükseklik)
2. **GZ = GM × sin(φ)** (Doğrultucu kol - küçük açılar)
3. **BM = I / ∇** (Metasantrik yarıçap)
4. **KB = T × (0.5 - (1/12) × (1-CWP/CB))** (Batıklık merkezi)

**IMO Kararlılık Kriterleri (IS Code 2008):**
- 0-30° alan: ≥ 3.151 m.derece
- 0-40° alan: ≥ 5.157 m.derece  
- 30-40° alan: ≥ 1.719 m.derece
- Max GZ: ≥ 0.20m ve açısı ≥ 30°
- GM başlangıç: ≥ 0.15m

**Stabilite Türleri:**
- **Form Stabilitesi**: Gemi genişliği kaynaklı
- **Ağırlık Stabilitesi**: CoG konumu kaynaklı
- **Dinamik Stabilite**: GZ eğrisi altındaki alan

**Risk Faktörleri:**
- Serbest yüzey etkisi (FSE)
- Yük kayması
- Su alma (flooding)
- Buzlanma (icing)`,

    "trim": `**Trim ve List Hesaplamaları:**

**Trim Formülü:**
Trim = Ta - Tf (Kıç su çekimi - Baş su çekimi)

**Trim Açısı:**
θ = arctan(Trim / LPP)

**Boyuna Metasantır:**
GML = KML - KG

**MCT (Metre Trim Moment):**
MCT1cm = (Δ × GML) / (100 × LPP)

**Trim Değerlendirmesi:**
- |θ| < 0.5°: Normal
- 0.5° ≤ |θ| < 2.0°: Kabul edilebilir
- |θ| ≥ 2.0°: Aşırı trim

**List Hesabı:**
List = arctan(Transvers Moment / (Δ × GM))

**Düzeltme Yöntemleri:**
- Baş trim fazla: Kıç balast ekle
- Kıç trim fazla: Baş balast ekle
- List varsa: Yük dengesini kontrol et`,

    "navigasyon": `**Denizcilik Navigasyon Hesaplamaları:**

**Büyük Daire Seyiri:**
- Mesafe = arccos(sin(φ1)×sin(φ2) + cos(φ1)×cos(φ2)×cos(Δλ))
- İlk kurs = arctan(sin(Δλ) / (cos(φ1)×tan(φ2) - sin(φ1)×cos(Δλ)))

**Rhumb Line (Loxodrome):**
- Mesafe = Δφ / cos(kurs)
- Kurs = arctan(Δλ / Δφ)

**Hız-Mesafe-Zaman:**
- Hız (knot) = Mesafe (n.mil) / Zaman (saat)
- ETA = ETD + (Mesafe / Hız)

**Gelgit Hesaplamaları:**
- Yüksek su zamanı (HW)
- Alçak su zamanı (LW)  
- Gelgit yüksekliği = MHWS - MLWS

**Radar Hesaplamaları:**
- Radar horizon = 2.22 × √(antenna height)
- CPA (En yakın geçiş noktası)
- TCPA (En yakın geçiş zamanı)`,

    "motor": `**Gemi Motor ve Yakıt Hesaplamaları:**

**Motor Gücü:**
- BHP (Brake Horse Power)
- SHP (Shaft Horse Power)  
- EHP (Effective Horse Power)
- DHP (Delivered Horse Power)

**Yakıt Tüketimi (SFOC):**
SFOC = Yakıt Tüketimi (g/h) / Güç (kW)

**Tipik SFOC Değerleri:**
- Modern diesel: 180-200 g/kWh
- Eski diesel: 220-250 g/kWh
- Gas turbine: 250-300 g/kWh

**Makine Performansı:**
- Termik verim = Kullanılan enerji / Toplam enerji
- Mekanik verim = Şaft gücü / İndike güç
- Pervane verimi = İtki gücü / Şaft gücü

**Bakım Hesaplamaları:**
- Running hours
- Service intervals
- Yedek parça hesabı`,

    "cargo": `**Kargo ve Yükleme Hesaplamaları:**

**Kargo Kapasitesi:**
- Deadweight (DWT) = Displasман - Light ship
- Cargo Carrying Capacity (CCC)
- Bale capacity vs Grain capacity

**Ağırlık Merkezi:**
KG = Σ(Ağırlık × Yükseklik) / Σ(Ağırlık)

**Yük Dağılımı:**
- Port/Starboard balance
- Fore/Aft balance  
- Vertical distribution

**Container Hesaplamaları:**
- TEU (Twenty-foot Equivalent Unit)
- FEU (Forty-foot Equivalent Unit)
- Container stacking loads
- Lashing forces

**Bulk Cargo:**
- Stowage factor (m³/ton)
- Angle of repose
- Trimming requirements
- Moisture content`,

    "güvenlik": `**Gemi Güvenlik Hesaplamaları:**

**Cankurtarma Donanımı:**
- Personel sayısı × 1.1 (fazladan %10)
- Can salı kapasitesi hesabı
- Can yeleği sayısı (100% + %5 çocuk)

**Yangın Güvenliği:**
- CO2 miktarı = Hacim × 0.4 (makine dairesi)
- Su sprey sistemi kapasitesi
- Köpük sistemi hesabı

**Stabilite Hasarı:**
- Flooding calculations
- Permeability factors
- Residual stability
- Cross flooding time

**SOLAS Kriterleri:**
- Subdivision regulations
- Damage stability requirements
- Life saving appliances
- Fire protection systems

**Acil Durum:**
- Abandon ship procedures
- Muster station capacity
- Evacuation time calculations`,

    "balast": `**Balast Sistemi Hesaplamaları:**

**Balast Kapasitesi:**
- Total ballast capacity
- Segregated ballast tanks
- Double bottom tanks
- Wing tanks

**Balast Operasyonları:**
- Filling/Emptying time
- Pump capacity requirements
- Sequence planning
- Stability during operations

**Balast Suyu Yönetimi:**
- BWM Convention requirements
- Treatment system capacity
- Exchange procedures
- Recording requirements

**Hesaplama Formülleri:**
- Pump time = Volume / Flow rate
- Head loss calculations  
- Power requirements
- Pipe sizing

**Environmental:**
- Discharge standards
- Treatment efficiency
- Monitoring requirements`,

    "default": `**Maritime Mühendisliği AI Asistanı - Aktif! 🚢**

Denizcilik hesaplamaları konusunda uzman yardımınıza hazırım!

**📊 Hesaplama Alanlarım:**
• **Stabilite**: GM, GZ, BM, metasantır hesaplamaları
• **Trim & List**: Boyuna ve enine denge
• **Navigasyon**: Büyük daire, rhumb line, ETA
• **Motor**: Güç, yakıt tüketimi, SFOC
• **Kargo**: Yük dağılımı, ağırlık merkezi
• **Güvenlik**: SOLAS, can kurtarma, yangın
• **Balast**: Tank hesaplamaları, BWM

**🎯 Soru Örnekleri:**
• "GM hesaplaması nasıl yapılır?"
• "Stabilite kriterleri nelerdir?"
• "Trim açısı nasıl bulunur?"
• "Motor gücü hesaplama yöntemi"
• "SOLAS güvenlik gereklilikleri"

**⚡ Özelliklerim:**
• Detaylı formül açıklamaları
• IMO/SOLAS standart referansları  
• Pratik hesaplama örnekleri
• Risk değerlendirmeleri
• Troubleshooting önerileri

Hangi konuda yardım istiyorsunuz?`
  };

  const getGeminiResponse = async (userQuestion: string): Promise<string> => {
    const langName = getLanguageDisplayName(currentLanguage);
    const { data, error } = await supabase.functions.invoke("gemini-chat", {
      body: {
        messages: [
          {
            role: "system",
            content: `You are an expert Maritime Engineering AI assistant with comprehensive knowledge of ship stability, navigation, marine engineering, cargo operations, safety regulations, and ballast systems.

Provide detailed, technical, and practical answers. Organize your response with clear headings, formulas, and practical notes. Reference IMO/SOLAS standards where applicable.

CRITICAL: You MUST respond entirely in ${langName} (language code: ${currentLanguage}). Do not use any other language.`
          },
          { role: "user", content: userQuestion }
        ]
      }
    });
    if (error) throw error;
    return data?.text || "";
  };

  const processAIQuery = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    setIsLoading(true);
    const currentQuestion = question.trim();

    try {
      let response = "";

      try {
        response = await getGeminiResponse(currentQuestion);
        toast.success("Response ready");
      } catch {
        // Fallback to local knowledge base
        const lowerQuestion = currentQuestion.toLowerCase();
        if (lowerQuestion.includes("gm") || lowerQuestion.includes("metacentric")) {
          response = maritimeKnowledgeBase.gm;
        } else if (lowerQuestion.includes("stabilite") || lowerQuestion.includes("stability") || lowerQuestion.includes("kararlı")) {
          response = maritimeKnowledgeBase.stabilite;
        } else if (lowerQuestion.includes("trim") || lowerQuestion.includes("list") || lowerQuestion.includes("denge")) {
          response = maritimeKnowledgeBase.trim;
        } else if (lowerQuestion.includes("navigasyon") || lowerQuestion.includes("navigation") || lowerQuestion.includes("seyir") || lowerQuestion.includes("rota")) {
          response = maritimeKnowledgeBase.navigasyon;
        } else if (lowerQuestion.includes("motor") || lowerQuestion.includes("engine") || lowerQuestion.includes("makine") || lowerQuestion.includes("yakıt") || lowerQuestion.includes("sfoc")) {
          response = maritimeKnowledgeBase.motor;
        } else if (lowerQuestion.includes("kargo") || lowerQuestion.includes("cargo") || lowerQuestion.includes("yük") || lowerQuestion.includes("container")) {
          response = maritimeKnowledgeBase.cargo;
        } else if (lowerQuestion.includes("güvenlik") || lowerQuestion.includes("safety") || lowerQuestion.includes("solas") || lowerQuestion.includes("yangın") || lowerQuestion.includes("fire")) {
          response = maritimeKnowledgeBase.güvenlik;
        } else if (lowerQuestion.includes("balast") || lowerQuestion.includes("ballast")) {
          response = maritimeKnowledgeBase.balast;
        } else {
          response = maritimeKnowledgeBase.default;
        }
        toast.info("Using local knowledge base");
      }

      setAiResponse(response);
      setConversationHistory(prev => [...prev, { question: currentQuestion, answer: response }]);
      setQuestion("");

    } catch (error) {
      console.error('Response Error:', error);
      toast.error("Could not get a response");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "GM hesaplaması nedir?",
    "Stabilite kriterleri nelerdir?", 
    "Trim açısı nasıl bulunur?",
    "SFOC nasıl hesaplanır?",
    "SOLAS güvenlik standartları",
    "Kargo ağırlık merkezi hesabı",
    "Navigasyon büyük daire hesabı",
    "Balast operasyon hesaplamaları"
  ];

  const handleSuggestedQuestion = (suggestion: string) => {
    setQuestion(suggestion);
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Brain className="w-5 h-5" />
            Maritime Uzman Sistem
          </CardTitle>
          <CardDescription className="text-green-700">
            Denizcilik mühendisliği konularında kapsamlı uzman destek
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Textarea
              placeholder="Maritime mühendisliği sorunuzu yazın...

Örnek sorular:
• GM hesaplaması nedir?
• Stabilite kriterleri nelerdir?
• Trim açısı nasıl bulunur?
• Motor SFOC hesaplama yöntemi
• SOLAS güvenlik standartları"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[120px] border-green-300 focus:border-green-500"
              disabled={isLoading}
            />
            
            <Button 
              onClick={processAIQuery}
              disabled={isLoading || !question.trim()}
              className="w-full gap-2 bg-green-600 hover:bg-green-700"
            >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Hesaplanıyor...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4" />
                Danış
              </>
            )}
            </Button>
          </div>

          {aiResponse && (
            <Card className="bg-info-muted border-info/20">
              <CardContent className="pt-4">
                <h4 className="font-semibold text-info-muted-foreground mb-3 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Uzman Yanıtı:
                </h4>
                <div className="text-sm text-info-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {stripMarkdown(aiResponse)}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggested Questions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Önerilen Sorular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto py-2 px-3 text-xs leading-relaxed hover:bg-green-50 hover:border-green-300"
                    onClick={() => handleSuggestedQuestion(suggestion)}
                    disabled={isLoading}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversation History */}
          {conversationHistory.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Sohbet Geçmişi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-60 overflow-y-auto">
                {conversationHistory.slice(-3).map((conv, index) => (
                  <div key={index} className="text-xs border-l-2 border-gray-200 pl-3">
                    <p className="font-medium text-gray-700 dark:text-gray-300">S: {conv.question}</p>
                    <p className="text-gray-600 mt-1 line-clamp-2">C: {conv.answer.substring(0, 150)}...</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="text-xs text-green-700 bg-green-100 border border-green-200 rounded p-3">
            <strong>✅ Uzman Sistem Hazır:</strong> Kapsamlı bilgi bankası ile çalışır ve anında yanıt verir. 
            Tüm denizcilik mühendisliği konularında profesyonel destek sağlar.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};