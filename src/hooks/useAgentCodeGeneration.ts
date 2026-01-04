import { useState, useCallback } from 'react';
import { generateCode, streamGenerateCode, saveComponent } from '@/services/agentService';
import type { AgentMessage, AgentRequest, ComponentType, ComponentCategory } from '@/types/agent';
import { toast } from 'sonner';

export function useAgentCodeGeneration() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [componentType, setComponentType] = useState<ComponentType>('calculation');
  const [category, setCategory] = useState<ComponentCategory>('general');

  const sendMessage = useCallback(async (prompt: string, useStreaming = true) => {
    const userMessage: AgentMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const request: AgentRequest = {
        prompt,
        context: {
          componentType,
          category,
          existingCode: currentCode || undefined,
        },
      };

      if (useStreaming) {
        let assistantContent = '';
        
        const assistantMessage: AgentMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);

        await streamGenerateCode(
          request,
          (delta) => {
            assistantContent += delta;
            setMessages(prev => 
              prev.map(m => 
                m.id === assistantMessage.id 
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          },
          (code) => {
            setCurrentCode(code);
            setMessages(prev =>
              prev.map(m =>
                m.id === assistantMessage.id
                  ? { ...m, code }
                  : m
              )
            );
          },
          () => {
            setIsLoading(false);
          }
        );
      } else {
        const response = await generateCode(request);

        const assistantMessage: AgentMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.message,
          code: response.code,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);

        if (response.code) {
          setCurrentCode(response.code);
        }
        if (response.componentType) {
          setComponentType(response.componentType as ComponentType);
        }
        if (response.category) {
          setCategory(response.category as ComponentCategory);
        }

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Agent error:', error);
      toast.error(error instanceof Error ? error.message : 'Kod üretimi başarısız oldu');
      setIsLoading(false);
    }
  }, [componentType, category, currentCode]);

  const saveCurrentComponent = useCallback(async (name: string, description?: string) => {
    if (!currentCode) {
      toast.error('Kaydedilecek kod yok');
      return;
    }

    try {
      const { data: { user } } = await (await import('@/integrations/supabase/client')).supabase.auth.getUser();
      
      if (!user) {
        toast.error('Kaydetmek için giriş yapmalısınız');
        return;
      }

      await saveComponent({
        user_id: user.id,
        name,
        description,
        code: currentCode,
        component_type: componentType,
        category,
        is_public: false,
        metadata: {},
      });

      toast.success('Bileşen kaydedildi!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Kaydetme başarısız oldu');
    }
  }, [currentCode, componentType, category]);

  const updateCode = useCallback((code: string) => {
    setCurrentCode(code);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentCode('');
  }, []);

  return {
    messages,
    currentCode,
    isLoading,
    componentType,
    category,
    setComponentType,
    setCategory,
    sendMessage,
    saveCurrentComponent,
    updateCode,
    clearChat,
  };
}
