// AI Agent Types for Marine Expert

export type ComponentType = 'calculation' | 'chart' | 'topic' | 'table' | 'animation' | 'form';
export type ComponentCategory = 'navigation' | 'stability' | 'safety' | 'cargo' | 'engine' | 'weather' | 'general';

export interface GeneratedComponent {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  code: string;
  component_type: ComponentType;
  category: ComponentCategory;
  thumbnail_url?: string;
  is_public: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  code?: string;
  timestamp: Date;
}

export interface AgentRequest {
  prompt: string;
  context?: {
    componentType?: ComponentType;
    category?: ComponentCategory;
    existingCode?: string;
  };
}

export interface AgentResponse {
  message: string;
  code?: string;
  componentType?: ComponentType;
  category?: ComponentCategory;
}

export interface CodeExecutionResult {
  success: boolean;
  error?: string;
  component?: React.ReactNode;
}

export interface FileUploadResult {
  fileName: string;
  fileType: string;
  content?: string;
  extractedData?: Record<string, unknown>;
  suggestedAction?: 'table' | 'chart' | 'topic' | 'calculation';
}
