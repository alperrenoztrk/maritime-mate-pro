import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Paperclip, X, FileText, Image, FileSpreadsheet, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { AgentMessage } from '@/types/agent';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useFileUpload, type UploadedFile } from '@/hooks/useFileUpload';

interface AgentChatProps {
  messages: AgentMessage[];
  isLoading: boolean;
  onSendMessage: (message: string, files?: UploadedFile[]) => void;
}

const QUICK_PROMPTS = [
  { label: 'GM Hesaplama', prompt: 'GM (Metacentric Height) hesaplama bileşeni oluştur' },
  { label: 'Stabilite Grafiği', prompt: 'GZ eğrisi grafiği çizen bir bileşen oluştur' },
  { label: 'Seyir Hesabı', prompt: 'Büyük daire seyri hesaplama formu oluştur' },
  { label: 'Trim Tablosu', prompt: 'Trim hesaplama tablosu oluştur' },
];

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image;
  if (type.includes('spreadsheet') || type.includes('excel') || type === 'text/csv') return FileSpreadsheet;
  if (type.includes('pdf') || type.includes('document') || type.includes('word')) return FileText;
  return File;
};

export function AgentChat({ messages, isLoading, onSendMessage }: AgentChatProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadedFiles, isUploading, uploadFiles, removeFile, clearFiles, formatFileSize } = useFileUpload();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      void clearFiles();
    };
  }, [clearFiles]);

  const handleSubmit = () => {
    if ((!input.trim() && uploadedFiles.length === 0) || isLoading || isUploading) return;
    onSendMessage(input.trim(), uploadedFiles.length > 0 ? uploadedFiles : undefined);
    setInput('');
    void clearFiles();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(e.target.files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
                  <p className="text-sm text-muted-foreground">
                    {isUploading ? 'Dosya yükleniyor...' : 'Kod üretiliyor...'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        {/* Uploaded files preview */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {uploadedFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm"
                >
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="ml-1 hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading || isUploading}
            className="h-[60px] w-[60px] shrink-0"
            title="Dosya ekle (max 30MB)"
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Paperclip className="h-5 w-5" />
            )}
          </Button>
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ne oluşturmamı istersiniz?"
            className="min-h-[60px] max-h-[120px] resize-none"
            disabled={isLoading || isUploading}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={(!input.trim() && uploadedFiles.length === 0) || isLoading || isUploading}
            size="icon"
            className="h-[60px] w-[60px] shrink-0"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          PDF, Excel, Word, CSV, JSON ve diğer dosyalar desteklenir (max 30MB)
        </p>
      </div>
    </div>
  );
}
