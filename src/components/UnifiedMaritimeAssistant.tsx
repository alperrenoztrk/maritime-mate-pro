import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ship, Loader2, MessageCircle, Calculator, Send, BarChart3, Compass } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { useLanguage } from "@/contexts/useLanguage";
import { getLanguageDisplayName } from "@/services/aiClient";
import { stripMarkdown } from "@/utils/cleanText";
import { ReportAiContentButton } from "@/components/ai/ReportAiContentButton";

export const UnifiedMaritimeAssistant = () => {
  const { currentLanguage } = useLanguage();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, answer: string, timestamp: number}>>([]);

  const getGeminiResponse = async (prompt: string): Promise<string> => {
    const langName = getLanguageDisplayName(currentLanguage);
    try {
      const { data, error } = await supabase.functions.invoke("gemini-chat", {
        body: {
          messages: [
            {
              role: "system",
              content: `You are "Mark", a Maritime Regulations Guide assistant. You describe where to find specific information on ships, which book/volume/table to use, and the practical access path.

Your priorities:
- Direct users to IS Code, SOLAS, MARPOL, COLREG, IAMSAR, STCW, LOAD LINE, IMDG Code, Grain Code, ALRS (Admiralty List of Radio Signals), NP/NP5011, NP100, etc.
- Answer clearly: "From which source, which volume/section/heading?"
- Specify page/section examples when needed (e.g., ALRS Vol 3, Radiofacsimile/WeatherFax Schedules).
- Keep responses brief and clear: Source/Volume first, then access method and notes.

Respond using this template:
- **Source**: (book/code name, volume/section)
- **Access**: (where/how to find it; index, topic heading, table/appendix example)
- **Note**: (brief warning/exception/related source)

CRITICAL: You MUST respond entirely in ${langName} (language code: ${currentLanguage}). Do not use any other language.`
            },
            { role: "user", content: prompt }
          ]
        }
      });

      if (error) throw error;
      return data?.text || "No response received";
    } catch (error) {
      console.error('AI API failed:', error);
      throw error;
    }
  };

  // Auto-calculate if question contains numbers
  const detectCalculation = (text: string) => {
    const patterns = {
      displacement: /(?:deplasman|displacement).*?(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/i,
      gm: /(?:gm|stabilite).*?km[:\s=]*(\d+(?:\.\d+)?).*?kg[:\s=]*(\d+(?:\.\d+)?)/i,
      distance: /(?:mesafe|distance).*?(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?).*?(\d+(?:\.\d+)?)/i,
      power: /(?:güç|power|hp|kw).*?(\d+(?:\.\d+)?)/i,
      speed: /(?:hız|speed|knot).*?(\d+(?:\.\d+)?)/i
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      const match = text.match(pattern);
      if (match) {
        return { type, values: match.slice(1).map(v => parseFloat(v)).filter(v => !isNaN(v)) };
      }
    }
    return null;
  };

  const performWolframCalculation = async (query: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke("wolfram-calc", {
        body: { query }
      });
      
      if (error) return null;
      return data?.result || null;
    } catch (error) {
      console.error('Wolfram calculation failed:', error);
      return null;
    }
  };

  const getLocalKnowledge = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    const mapping: Array<{ test: RegExp; answer: string }> = [
      {
        test: /(weather\s*fax|radiofax|weatherfax|fax\s*mesaj|hava\s*faks|radiofacsimile|facsimile)/i,
        answer: `- **Source**: Admiralty List of Radio Signals (ALRS) — Volume 3 (Vol. 3): Maritime Safety Information Services — Radiofacsimile (Weather Fax) publications
- **Access**: “Radiofacsimile/Weather Fax Schedules” title in ALRS Vol 3; station list and frequencies. Index: "Radiofacsimile" or "Weather" → corresponding table/appendix.
- **Note**: For some regions, NAVAREA announcements and Marine Meteorology broadcast plans (sched) are also checked.`
      },
      {
        test: /(navtex)/i,
        answer: `- **Source**: ALRS — Volume 3 (Vol. 3): Maritime Safety Information — NAVTEX broadcast stations and frequencies
- **Access**: “NAVTEX Stations” table; station ID, MSC frequencies (518/490/4209.5 kHz), program times
- **Note**: Check NAVAREA/METAREA bulletin extracts and local language publications.`
      },
      {
        test: /(vhf|port operations|liman\s*iletişim|pilotage)/i,
        answer: `- **Source**: ALRS — Volume 6 (Vol. 6): Pilotage, Port Operations and Services
- **Access**: Port-based VHF channels, maneuvering/guidance/service information. Index: Port name → VHF Channel/Radio Call signs.
- **Note**: Complete the Sailing Guide/NP (Sailing Directions) with the relevant volume.`
      },
      {
        test: /(distress|gmdss|tehlike|acil|epirb|sart|dsC)/i,
        answer: `- **Source**: ALRS — Volume 5 (Vol. 5): Global Maritime Distress and Safety System (GMDSS)
- **Access**: Distress/Safety procedures, DSC, EPIRB, SART, Inmarsat/MF/HF calls, MMSI and MRCC contact information
- **Note**: Use in conjunction with the IAMSAR Volume 3 operations guide.`
      },
      {
        test: /(advisory|warning|msi|metarea|navarea)/i,
        answer: `- **Source**: ALRS — Volume 3 (Vol. 3): Maritime Safety Information Services (NAVAREA/METAREA)
- **Reach**: NAVAREA coordinators, broadcast channels/frequencies, MSI distribution paths
- **Note**: Check with NAVTEX/RADIOFAX plans and SafetyNET.`
      },
      {
        test: /(colreg|ışıklar|seyir\s*fenerleri|ışık karakteri)/i,
        answer: `- **Source**: COLREG and Admiralty List of Lights (Aids to Navigation) — Regional volumes
- **Reach**: Beacon/buoy light characters, sectoral ranges. Index: Geographic area/light number
- **Note**: Confirm with Electronic Chart (ENC) and NP5011 (Symbols and Abbreviations).`
      },
      {
        test: /(load\s*line|fribord|serbest\s*bord|assignments)/i,
        answer: `- **Source**: International Load Line Convention + Flag State guidelines
- **Access**: Free side signals and calculation methodology; classification society rules
- **Note**: Compatibility with the Stability Booklet and Freeboard Calculation files is required.`
      }
    ];

    for (const m of mapping) {
      if (m.test.test(question)) return m.answer;
    }

    const knowledge = {
      "gm": `**GM (Metacentric Height) Calculation**

**Formula:** GM = KM - KG

**Components:**
- **KM**: Metacenter distance (keel to metacenter)
- **KG**: Center of gravity height (keel to CoG)

**IMO Criteria:**
- **Minimum**: GM ≥ 0.15m
- **Optimal**: 0.15m ≤ GM ≤ 0.35m  
- **Extremely hard**: GM > 0.35m

**Practical Evaluation:**
- GM < 0.15m: Dangerous
- GM = 0.15-0.35m: Ideal
- GM > 0.35m: Extremely hard`,

      "stabilite": `**Ship Stability Calculations**

**Basic Formulas:**
1. **GM = KM - KG** (Metacentric height)
2. **GZ = GM × sin(φ)** (Rectifier arm)
3. **BM = I / ∇** (Metacentric radius)

**IMO IS Code 2008 Criteria:**
- 0-30° area: ≥ 3.151 m.degree
- 0-40° area: ≥ 5.157 m.degree
- 30-40° area: ≥ 1.719 m.degree
- Max GZ: ≥ 0.20m, angle ≥ 30°`,

      "deplasman": `**Displacement Calculation**

**Formula:** Δ = L × B × T × Cb × ρ

**Components:**
- **L**: Ship length (m)
- **B**: Ship width (m)
- **T**: Draft (m)
- **Cb**: Block coefficient (0.6-0.8)
- **ρ**: Water density (1.025 t/m³)`,

      "trim": `**Trim Calculations**

**Trim:** Ta - Tf (Aft draft - Fore draft)
**Trim Angle:** θ = arctan(Trim / LPP)
**MCT:** MCT1cm = (Δ × GML) / (100 × LPP)`
    };

    for (const [key, answer] of Object.entries(knowledge)) {
      if (lowerQuestion.includes(key)) {
        return answer;
      }
    }

    return `**Assistant**

I am ready to help you with maritime engineering issues!

**Areas of Expertise:**
• **Stability**: GM, GZ, metacenter calculations
• **Navigation**: Distance, speed, route calculations  
• **Hydrodynamics**: Resistance, power, thrust analysis
• **Structural**: Strength, stress calculations
• **Safety**: IMO, SOLAS criteria
• **Economic**: Cost, fuel optimization

Ask a detailed question and I will provide you with calculations and explanations!`;
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      toast.error("Please write a question");
      return;
    }

    setIsLoading(true);
    const currentQuestion = question.trim();
    setQuestion("");

    try {
      let answer = "";
      let wolframResult = "";

      // Check if question needs calculation
      const calculation = detectCalculation(currentQuestion);
      
      if (calculation) {
        // Background Wolfram calculation
        let wolframQuery = "";
        
        switch (calculation.type) {
          case 'displacement':
            if (calculation.values.length >= 3) {
              wolframQuery = `${calculation.values[0]} * ${calculation.values[1]} * ${calculation.values[2]} * 0.7 * 1.025`;
            }
            break;
          case 'gm':
            if (calculation.values.length >= 2) {
              wolframQuery = `${calculation.values[0]} - ${calculation.values[1]}`;
            }
            break;
          case 'power':
            if (calculation.values.length >= 1) {
              wolframQuery = `${calculation.values[0]} hp to kw`;
            }
            break;
        }

        if (wolframQuery) {
          const wolframCalc = await performWolframCalculation(wolframQuery);
          if (wolframCalc) {
            wolframResult = `\n\n**Hesaplama Sonucu:** ${wolframCalc}`;
          }
        }
      }

      // Try Gemini first, fallback to local
      try {
        answer = await getGeminiResponse(currentQuestion);
        toast.success("Response prepared");
      } catch (error) {
        console.warn('Gemini failed, using local knowledge:', error);
        answer = getLocalKnowledge(currentQuestion);
        toast.info("Local knowledge base used");
      }

      // Combine answers
      const finalAnswer = answer + wolframResult;
      setResponse(finalAnswer);
      
      // Add to conversation history
      const newEntry = {
        question: currentQuestion,
        answer: finalAnswer,
        timestamp: Date.now()
      };
      setConversationHistory(prev => [newEntry, ...prev.slice(0, 4)]); // Keep last 5

    } catch (error) {
      console.error('Assistant error:', error);
      toast.error("No response received");
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "How to calculate GM?",
    "What is the trim angle formula?",
    "What are the stability criteria?",
    "SFOC calculation method",
    "Great circle cruise calculation"
  ];

  const handleQuickQuestion = (q: string) => {
    setQuestion(q);
  };

  return (
          <Card className="shadow-lg mb-6">
      <CardContent className="space-y-4">
        {/* Quick Questions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground mt-4">Quick Questions:</h4>
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
            placeholder="Type your maritime questions here...\n\nExamples:\n• 'How to calculate GM?'\n• 'GM value of the ship with KM 15.2m, KG 14.8m?'\n• 'What are the stability criteria?'"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isLoading}
          />
          
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !question.trim()}
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Sor
              </>
            )}
          </Button>
        </div>

        {/* Response */}
        {response && (
          <div className="p-4 bg-card border border-primary/20 rounded-lg shadow-sm">
            <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Expert Evaluation:
            </h4>
            <div className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed space-y-2">
              {response.split('\n').map((line, index) => {
                const cleaned = stripMarkdown(line);
                // Formül satırları için özel stil
                if (line.includes('=') && (line.includes('×') || line.includes('+') || line.includes('-') || line.includes('/'))) {
                  return (
                    <div key={index} className="bg-muted border border-primary/30 p-3 rounded-lg font-mono text-sm">
                      <code className="text-foreground">{cleaned}</code>
                    </div>
                  );
                }
                // Başlık satırları
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <h5 key={index} className="font-semibold text-primary mt-3 mb-1">
                      {cleaned}
                    </h5>
                  );
                }
                // Normal satırlar
                return cleaned.trim() ? (
                  <p key={index} className="mb-1">{cleaned}</p>
                ) : (
                  <div key={index} className="h-2"></div>
                );
              })}
            </div>
            <div className="mt-3 border-t border-border/40 pt-2">
              <ReportAiContentButton
                surface="maritime_assistant"
                content={response}
                prompt={conversationHistory[0]?.question}
              />
            </div>
          </div>
        )}

        {/* Recent Questions */}
        {conversationHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Son Sorular:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {conversationHistory.slice(0, 3).map((entry, index) => (
                <div key={index} className="text-xs p-2 bg-muted rounded border-l-2 border-primary/30">
                  <div className="font-medium text-foreground">S: {entry.question}</div>
                  <div className="text-muted-foreground mt-1 truncate">
                    A: {entry.answer.substring(0, 80)}...
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
