import { useState, useCallback } from 'react';
import { generateCode, streamGenerateCode, saveComponent } from '@/services/agentService';
import { parseFiles, buildFileContext } from '@/services/fileParserService';
import type { AgentMessage, AgentRequest, ComponentType, ComponentCategory } from '@/types/agent';
import type { UploadedFile } from '@/hooks/useFileUpload';
import { toast } from 'sonner';

export function useAgentCodeGeneration() {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [currentCode, setCurrentCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [componentType, setComponentType] = useState<ComponentType>('calculation');
  const [category, setCategory] = useState<ComponentCategory>('general');

  const sendMessage = useCallback(async (prompt: string, files?: UploadedFile[]) => {
    // Build message content with file info
    let messageContent = prompt;
    if (files && files.length > 0) {
      const fileInfo = files.map(f => `📎 ${f.name} (${f.type})`).join('\n');
      messageContent = prompt ? `${prompt}\n\n${fileInfo}` : fileInfo;
    }

    const userMessage: AgentMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Parse files if any
      let fileContentForAI = '';
      if (files && files.length > 0) {
        setIsParsing(true);
        toast.info('Dosyalar işleniyor...');
        
        const parsedFiles = await parseFiles(files);
        fileContentForAI = buildFileContext(parsedFiles);
        
        const successCount = parsedFiles.filter(f => f.success).length;
        if (successCount > 0) {
          toast.success(`${successCount} dosya başarıyla işlendi`);
        }
        setIsParsing(false);
      }

      // Include file URLs and parsed content in context for AI processing
      const fileContext = files?.map(f => ({
        name: f.name,
        type: f.type,
        url: f.url,
      }));

      // Enhance prompt with parsed file content
      const enhancedPrompt = fileContentForAI 
        ? `${prompt || 'Bu dosyaları analiz et ve uygun bir bileşen oluştur'}${fileContentForAI}`
        : prompt || 'Bu dosyaları analiz et ve uygun bir bileşen oluştur';

      const request: AgentRequest = {
        prompt: enhancedPrompt,
        context: {
          componentType,
          category,
          existingCode: currentCode || undefined,
          files: fileContext,
        },
      };

      // Always use streaming for better UX
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
    } catch (error) {
      console.error('Agent error:', error);
      toast.error(error instanceof Error ? error.message : 'Kod üretimi başarısız oldu');
      setIsLoading(false);
      setIsParsing(false);
    }
  }, [componentType, category, currentCode]);

  const saveCurrentComponent = useCallback(async (name: string, description?: string) => {
    if (!currentCode) {
      toast.error('Kaydedilecek kod yok');
      return;
    }

    try {
      const { data: { user } } = await (await import('@/integrations/supabase/safeClient')).supabase.auth.getUser();
      
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
    isParsing,
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
