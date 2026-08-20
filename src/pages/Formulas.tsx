import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, MessageCircle, Send, Loader2, CheckCircle, AlertTriangle, Lightbulb, Trash2, Printer, Copy, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/safeClient";
import { UnifiedMaritimeAssistant } from "@/components/UnifiedMaritimeAssistant";

const Formulas = () => {
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseCount, setResponseCount] = useState(0);
  const [geminiApiStatus, setGeminiApiStatus] = useState<'unknown' | 'working' | 'error'>('unknown');
  const [conversationHistory, setConversationHistory] = useState<Array<{question: string, answer: string}>>([]);

  // Load the conversation history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('aiConversationHistory');
    if (savedHistory) {
      try {
        setConversationHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load conversation history:', e);
      }
    }
  }, []);

  // Persist the conversation history to localStorage whenever it changes
  useEffect(() => {
    if (conversationHistory.length > 0) {
      localStorage.setItem('aiConversationHistory', JSON.stringify(conversationHistory));
    }
  }, [conversationHistory]);

  // Check Gemini API status on mount
  useEffect(() => {
    checkGeminiApiStatus();
  }, []);

  const checkGeminiApiStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('ask-ai', {
        body: { question: "test" }
      });
      
      if (error) {
        setGeminiApiStatus('error');
      } else if (data?.source === 'gemini' || data?.source === 'hybrid') {
        setGeminiApiStatus('working');
      } else {
        setGeminiApiStatus('error');
      }
    } catch (error) {
      setGeminiApiStatus('error');
    }
  };

  const askAI = async () => {
    if (!question.trim()) {
      toast.error("Please write a question");
      return;
    }

    setIsLoading(true);
    
    try {
      // Supabase Edge Function call
      const { data, error } = await supabase.functions.invoke('ask-ai', {
        body: { 
          question: question.trim(),
          conversationHistory: conversationHistory // Send the conversation history
        }
      });

      if (error) {
        throw new Error(`Edge Function Error: ${error.message}`);
      }

      if (data?.answer) {
        setAiResponse(data.answer);
        setResponseCount(prev => prev + 1);
        
        // Append to the conversation history
        setConversationHistory(prev => [...prev, {
          question: question.trim(),
          answer: data.answer
        }]);
        
        // Update API status based on response
        if (data.source === 'gemini' || data.source === 'hybrid') {
          setGeminiApiStatus('working');
        }
        
        toast.success("AI response received.");
        setQuestion(""); // Soruyu temizle
      } else {
        throw new Error("The AI response could not be retrieved");
      }
    } catch (error) {
      console.error("AI question and answer error:", error);
      setGeminiApiStatus('error');
      toast.error(`AI error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "GM calculation formula",
    "How is the trim angle found?",
    "Stabilite kriterleri nelerdir?",
    "Great circle cruise calculation",
    "How is SFOC calculated?",
    "Ballast water distribution",
    "Metacentric radius formula",
    "IMO stability standards"
  ];

  const handleSuggestedQuestion = (suggestion: string) => {
    setQuestion(suggestion);
  };

  return (
    <MobileLayout>
      {/* Header Section - Mobil optimize */}
      <div className="text-center mb-6 px-2">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
          <h1 
            className="text-xl sm:text-2xl font-bold text-foreground leading-tight break-words"
            data-translatable
          >
            Mark'a Sor
          </h1>
        </div>
      </div>

      {/* Unified Maritime Assistant */}
      <UnifiedMaritimeAssistant />

      {/* Legacy Gemini Section - Hidden */}
      <div className="space-y-3 sm:space-y-4 hidden">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <CardTitle className="text-base sm:text-lg leading-tight" data-translatable>
                  Gemini AI Assistant (Advanced)
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {geminiApiStatus === 'working' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Active</span>
                  </div>
                )}
                {geminiApiStatus === 'error' && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-medium">API Key Required</span>
                  </div>
                )}
              </div>
            </div>
            <CardDescription className="text-xs sm:text-sm leading-relaxed px-1">
              <span data-translatable>
                {geminiApiStatus === 'working' 
                  ? "Advanced marine engineering analysis with Google Gemini AI."
                  : "Add GEMINI_API_KEY to the server environment variables."
                }
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-3 sm:space-y-4">
              <Textarea
                placeholder="Type your question here...

Example questions:
• How is GM calculated?
• What is the trim angle formula?
• Stabilite kriterleri nelerdir?
• Great circle sailing calculation
• SFOC calculation method
• Ballast water calculations"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[120px] sm:min-h-[160px] text-sm resize-none"
                disabled={isLoading}
                data-translatable-placeholder
              />
              
              <Button 
                onClick={askAI}
                disabled={isLoading || !question.trim()}
                className="w-full gap-2 text-sm sm:text-base h-10 sm:h-11"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden xs:inline" data-translatable>AI is thinking...</span>
                    <span className="xs:hidden" data-translatable>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span data-translatable>AI'ya Sor</span>
                  </>
                )}
              </Button>
            </div>

            {aiResponse && (
              <div className="mt-6">
                <div style={{
                  background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
                  border: '2px solid #3b82f6',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                  }}></div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          padding: '10px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Brain style={{ width: '24px', height: '24px', color: '#2563eb' }} />
                        </div>
                        <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e40af', margin: 0 }}>
                          AI Response
                        </h4>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(aiResponse);
                            toast.success("Response copied.");
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          title="Kopyala"
                        >
                          <Copy style={{ width: '18px', height: '18px', color: '#2563eb' }} />
                        </button>
                        <button
                          onClick={() => {
                            const printWindow = window.open('', '_blank');
                            if (printWindow) {
                              printWindow.document.write(`
                                <html>
                                  <head>
                                    <title>AI Response - Maritime Calculator</title>
                                    <style>
                                      body { font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto; }
                                      h1 { color: #0066cc; }
                                      .question { background: #f0f0f0; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
                                      .answer { line-height: 1.6; }
                                      @media print { body { padding: 20px; } }
                                    </style>
                                  </head>
                                  <body>
                                    <h1>Maritime Calculator - AI Response</h1>
                                    <div class="question">
                                      <strong>Question:</strong> ${question}
                                    </div>
                                    <div class="answer">
                                      ${aiResponse.replace(/\n/g, '<br>')}
                                    </div>
                                    <hr style="margin-top: 40px;">
                                    <p style="text-align: center; color: #666; font-size: 12px;">
                                      ${new Date().toLocaleString('tr-TR')} - Maritime Calculator
                                    </p>
                                  </body>
                                </html>
                              `);
                              printWindow.document.close();
                              printWindow.print();
                            }
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          title="Print"
                        >
                          <Printer style={{ width: '18px', height: '18px', color: '#2563eb' }} />
                        </button>
                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: 'Maritime Calculator — AI Response',
                                text: `Soru: ${question}\n\nCevap: ${aiResponse}`
                              }).catch(() => {});
                            } else {
                              navigator.clipboard.writeText(`Soru: ${question}\n\nCevap: ${aiResponse}`);
                              toast.success("The share text has been copied.");
                            }
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          title="Share"
                        >
                          <Share2 style={{ width: '18px', height: '18px', color: '#2563eb' }} />
                        </button>
                      </div>
                    </div>
                    <div style={{ fontSize: '15px', lineHeight: '1.8', color: '#1f2937' }}>
                      {aiResponse.split('\n').map((line, index) => {
                        // Highlight the headings
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <h3 key={index} style={{ 
                              fontSize: '18px', 
                              fontWeight: 'bold', 
                              color: '#1e40af', 
                              marginTop: '16px', 
                              marginBottom: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <span style={{ 
                                width: '4px', 
                                height: '20px', 
                                background: '#3b82f6', 
                                borderRadius: '2px' 
                              }}></span>
                              {line.replace(/\*\*/g, '')}
                            </h3>
                          );
                        }
                        
                        // Sub-headings (bold text)
                        if (line.includes('**') && !line.startsWith('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={index} className="mb-2">
                              {parts.map((part, i) => 
                                i % 2 === 1 ? <strong key={i} className="text-primary font-semibold">{part}</strong> : part
                              )}
                            </p>
                          );
                        }
                        
                        // List items
                        if (line.startsWith('- ') || line.startsWith('• ')) {
                          return (
                            <div key={index} className="flex items-start gap-2 ml-2">
                              <span className="text-primary mt-1.5">•</span>
                              <span className="flex-1">{line.substring(2)}</span>
                            </div>
                          );
                        }
                        
                        // Numbered list
                        if (/^\d+\./.test(line)) {
                          const [num, ...content] = line.split('.');
                          return (
                            <div key={index} className="flex items-start gap-3 ml-2">
                              <span className="text-primary font-semibold min-w-[20px]">{num}.</span>
                              <span className="flex-1">{content.join('.').trim()}</span>
                            </div>
                          );
                        }
                        
                        // Code blocks (delimited by backticks)
                        if (line.includes('`')) {
                          const parts = line.split('`');
                          return (
                            <p key={index} className="mb-2">
                              {parts.map((part, i) => 
                                 i % 2 === 1 ? (
                                   <code key={i} className="bg-card border border-primary/20 px-2 py-1 rounded text-sm font-mono text-card-foreground">
                                     {part}
                                   </code>
                                 ) : part
                              )}
                            </p>
                          );
                        }
                        
                        // Formula lines (those containing =)
                        if (line.includes('=') && (line.includes('×') || line.includes('+') || line.includes('-') || line.includes('/'))) {
                          return (
                            <div key={index} className="bg-card border-2 border-primary/30 p-3 rounded-lg font-mono text-sm shadow-sm">
                              <code className="text-card-foreground">{line}</code>
                            </div>
                          );
                        }
                        
                        // Normal paragraf
                        if (line.trim()) {
                          return (
                            <p key={index} className="mb-2">
                              {line}
                            </p>
                          );
                        }
                        
                        return <div key={index} className="h-2"></div>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversation history */}
        {conversationHistory.length > 0 && (
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span data-translatable>Conversation History</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setConversationHistory([]);
                  localStorage.removeItem('aiConversationHistory');
                  toast.success("The conversation history has been cleared");
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {conversationHistory.slice(-5).map((item, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-3 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-primary mt-0.5" />
                      <div className="text-sm font-medium text-primary flex-1">
                        {item.question}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div className="text-xs text-muted-foreground line-clamp-3 flex-1">
                        {item.answer.replace(/\*\*/g, '').replace(/\n/g, ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {conversationHistory.length > 5 && (
                <div className="mt-3 text-xs text-muted-foreground text-center">
                  Showing the last 5 conversations
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Suggested questions — optimised for mobile */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <span data-translatable>Example Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Numerical questions:</h4>
                <div className="grid gap-1">
                  <button 
                    onClick={() => setQuestion("Calculate the displacement of a vessel 100 metres long, 20 metres in beam and with a draft of 8 metres")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Displacement calculation
                  </button>
                  <button 
                    onClick={() => setQuestion("What is 50 knots in km/h?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Unit conversion
                  </button>
                  <button 
                    onClick={() => setQuestion("What is the period of a 5 metre high wave?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Wave calculation
                  </button>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Maritime questions:</h4>
                <div className="grid gap-1">
                  <button 
                    onClick={() => setQuestion("COLREG Kural 13 ne der?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • COLREG rules
                  </button>
                  <button 
                    onClick={() => setQuestion("MARPOL Annex VI emisyon limitleri nedir?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • MARPOL requirements
                  </button>
                  <button 
                    onClick={() => setQuestion("What are the wind speed and wave height at Beaufort 7?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Meteorology
                  </button>
                  <button 
                    onClick={() => setQuestion("What are IMDG Code Class 3 dangerous goods?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Dangerous goods
                  </button>
                  <button 
                    onClick={() => setQuestion("What is VHF channel 16 used for?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Communications
                  </button>
                  <button 
                    onClick={() => setQuestion("Pilot merdiveni gereksinimleri nelerdir?")}
                    className="text-left text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    • Operational safety
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg" data-translatable>
              Frequently Asked Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-2 sm:py-3 px-3 text-xs sm:text-sm leading-relaxed"
                  onClick={() => handleSuggestedQuestion(suggestion)}
                  disabled={isLoading}
                >
                  <span data-translatable>{suggestion}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Formulas;