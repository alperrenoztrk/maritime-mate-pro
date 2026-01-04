// AI Agent Service for Marine Expert
import { supabase } from "@/integrations/supabase/client";
import type { AgentRequest, AgentResponse, GeneratedComponent, ComponentType, ComponentCategory } from "@/types/agent";

const AGENT_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-code-gen`;

export async function generateCode(request: AgentRequest): Promise<AgentResponse> {
  const response = await fetch(AGENT_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Kod üretimi başarısız oldu');
  }

  return response.json();
}

export async function streamGenerateCode(
  request: AgentRequest,
  onDelta: (text: string) => void,
  onCode: (code: string) => void,
  onDone: () => void
): Promise<void> {
  const response = await fetch(AGENT_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ ...request, stream: true }),
  });

  if (!response.ok || !response.body) {
    throw new Error('Streaming başarısız oldu');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let codeBuffer = '';
  let inCodeBlock = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);

      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') {
        if (codeBuffer) onCode(codeBuffer);
        onDone();
        return;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        
        if (content) {
          // Check for code blocks
          if (content.includes('```tsx') || content.includes('```typescript')) {
            inCodeBlock = true;
            continue;
          }
          if (content.includes('```') && inCodeBlock) {
            inCodeBlock = false;
            onCode(codeBuffer);
            codeBuffer = '';
            continue;
          }

          if (inCodeBlock) {
            codeBuffer += content;
          } else {
            onDelta(content);
          }
        }
      } catch {
        // Incomplete JSON, wait for more data
        buffer = line + '\n' + buffer;
        break;
      }
    }
  }

  onDone();
}

export async function saveComponent(
  component: Omit<GeneratedComponent, 'id' | 'created_at' | 'updated_at'>
): Promise<GeneratedComponent> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const insertData: any = {
    user_id: component.user_id,
    name: component.name,
    description: component.description || null,
    code: component.code,
    component_type: component.component_type,
    category: component.category || 'general',
    thumbnail_url: component.thumbnail_url || null,
    is_public: component.is_public,
    metadata: component.metadata || {},
  };

  const { data, error } = await supabase
    .from('user_generated_components')
    .insert([insertData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as GeneratedComponent;
}

export async function getUserComponents(): Promise<GeneratedComponent[]> {
  const { data, error } = await supabase
    .from('user_generated_components')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as GeneratedComponent[];
}

export async function getPublicComponents(): Promise<GeneratedComponent[]> {
  const { data, error } = await supabase
    .from('user_generated_components')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as GeneratedComponent[];
}

export async function updateComponent(
  id: string,
  updates: Partial<Pick<GeneratedComponent, 'name' | 'description' | 'code' | 'is_public'>>
): Promise<GeneratedComponent> {
  const updateData: Record<string, unknown> = {};
  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.code !== undefined) updateData.code = updates.code;
  if (updates.is_public !== undefined) updateData.is_public = updates.is_public;

  const { data, error } = await supabase
    .from('user_generated_components')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as GeneratedComponent;
}

export async function deleteComponent(id: string): Promise<void> {
  const { error } = await supabase
    .from('user_generated_components')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
