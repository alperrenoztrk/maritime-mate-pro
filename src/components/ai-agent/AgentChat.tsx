import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { AgentMessage } from '@/types/agent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AgentChatProps {
  messages: AgentMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

const QUICK_PROMPTS = [
  { label: 'GM Hesaplama', prompt: 'GM (Metacentric Height) hesaplama bileşeni oluştur' },
  { label: 'Stabilite Grafiği', prompt: 'GZ eğrisi grafiği çizen bir bileşen oluştur' },
  { label: 'Seyir Hesabı', prompt: 'Büyük daire seyri hesaplama formu oluştur' },
  { label: 'Trim Tablosu', prompt: 'Trim hesaplama tablosu oluştur' },
];

export function AgentChat({ messages, isLoading, onSendMessage }: AgentChatProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6"
            >
              <div className="relative">
                <Bot className="h-16 w-16 text-primary" />
                <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1" />
              </div>
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Marine Expert AI Agent</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Denizcilik hesaplamaları, grafikler ve konu anlatımları için kod üretebilirim.
            </p>
            
            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_PROMPTS.map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  size="sm"
                  onClick={() => onSendMessage(item.prompt)}
                  disabled={isLoading}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex gap-3 mb-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                  </div>
                  {message.code && (
                    <Badge variant="secondary" className="mt-2">
                      Kod üretildi ✓
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm text-muted-foreground">Kod üretiliyor...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ne oluşturmamı istersiniz?"
            className="min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-[60px] w-[60px]"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
