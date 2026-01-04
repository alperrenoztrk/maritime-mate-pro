import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, Save, RotateCcw, Maximize2, Minimize2, 
  Code, Eye, MessageSquare, Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useAgentCodeGeneration } from '@/hooks/useAgentCodeGeneration';
import { AgentChat } from './AgentChat';
import { CodeEditor } from './CodeEditor';
import { LivePreview } from './LivePreview';
import type { ComponentType, ComponentCategory } from '@/types/agent';
import { toast } from 'sonner';

interface AgentWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMPONENT_TYPES: { value: ComponentType; label: string }[] = [
  { value: 'calculation', label: 'Hesaplama' },
  { value: 'chart', label: 'Grafik' },
  { value: 'table', label: 'Tablo' },
  { value: 'topic', label: 'Konu Anlatımı' },
  { value: 'animation', label: 'Animasyon' },
  { value: 'form', label: 'Form' },
];

const CATEGORIES: { value: ComponentCategory; label: string }[] = [
  { value: 'navigation', label: 'Seyir' },
  { value: 'stability', label: 'Stabilite' },
  { value: 'safety', label: 'Güvenlik' },
  { value: 'cargo', label: 'Yük' },
  { value: 'engine', label: 'Makine' },
  { value: 'weather', label: 'Meteoroloji' },
  { value: 'general', label: 'Genel' },
];

export function AgentWorkspace({ isOpen, onClose }: AgentWorkspaceProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'code' | 'preview'>('chat');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [componentDescription, setComponentDescription] = useState('');

  const {
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
  } = useAgentCodeGeneration();

  const handleSave = async () => {
    if (!componentName.trim()) {
      toast.error('Bileşen adı gerekli');
      return;
    }

    await saveCurrentComponent(componentName.trim(), componentDescription.trim() || undefined);
    setSaveDialogOpen(false);
    setComponentName('');
    setComponentDescription('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-sm ${
          isFullscreen ? '' : 'p-4 md:p-8'
        }`}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className={`h-full w-full bg-background border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col ${
            isFullscreen ? 'rounded-none' : ''
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold">AI Agent</h2>
                <p className="text-xs text-muted-foreground">Marine Expert Kod Üretici</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Type & Category Selectors */}
              <Select value={componentType} onValueChange={(v) => setComponentType(v as ComponentType)}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPONENT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={category} onValueChange={(v) => setCategory(v as ComponentCategory)}>
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="h-6 w-px bg-border mx-2" />

              {/* Actions */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearChat}
                title="Sıfırla"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    disabled={!currentCode}
                    title="Kaydet"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bileşeni Kaydet</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Bileşen Adı</Label>
                      <Input
                        id="name"
                        value={componentName}
                        onChange={(e) => setComponentName(e.target.value)}
                        placeholder="Örn: GM Hesaplayıcı"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Açıklama (Opsiyonel)</Label>
                      <Input
                        id="description"
                        value={componentDescription}
                        onChange={(e) => setComponentDescription(e.target.value)}
                        placeholder="Kısa bir açıklama..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>İptal</Button>
                    <Button onClick={handleSave}>Kaydet</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden border-b border-border">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="chat" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Sohbet</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2">
                  <Code className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Kod</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Önizleme</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {/* Desktop: Resizable panels */}
            <div className="hidden md:block h-full">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={35} minSize={25}>
                  <AgentChat 
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={sendMessage}
                  />
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={65} minSize={40}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Kod Editörü</span>
                        </div>
                        <CodeEditor 
                          value={currentCode}
                          onChange={updateCode}
                          height="calc(100% - 32px)"
                        />
                      </div>
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Canlı Önizleme</span>
                        </div>
                        <div className="h-[calc(100%-32px)]">
                          <LivePreview code={currentCode} />
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>

            {/* Mobile: Tab content */}
            <div className="md:hidden h-full">
              {activeTab === 'chat' && (
                <AgentChat 
                  messages={messages}
                  isLoading={isLoading}
                  onSendMessage={sendMessage}
                />
              )}
              {activeTab === 'code' && (
                <div className="h-full p-4">
                  <CodeEditor 
                    value={currentCode}
                    onChange={updateCode}
                    height="100%"
                  />
                </div>
              )}
              {activeTab === 'preview' && (
                <div className="h-full p-4">
                  <LivePreview code={currentCode} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
