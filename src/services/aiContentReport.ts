/**
 * Yapay zekâ içeriği bildirimi.
 *
 * Google Play'in Üretken Yapay Zekâ politikası, AI üretimi rahatsız edici veya
 * yanlış içeriğin uygulama İÇİNDEN bildirilebilmesini zorunlu tutar. Bildirim
 * `ai_content_reports` tablosuna yazılır (bkz. supabase/migrations).
 *
 * AI özelliklerinin tamamı zaten oturum açmayı gerektirdiği (gemini-chat
 * anonim isteği reddeder) için bildirim de oturumlu kullanıcıdan gelir.
 */
import { supabase } from '@/integrations/supabase/safeClient';

export type AiReportReason = 'inaccurate' | 'offensive' | 'unsafe' | 'other';

/** Bildirimin geldiği ekran; incelemede hangi akış olduğunu ayırt etmek için. */
export type AiSurface =
  | 'ai_tutor'
  | 'ask_ai'
  | 'maritime_assistant'
  | 'assistant_interface'
  | 'stability_assistant';

/** Sütun sınırlarıyla uyumlu kırpma; sunucuya asla sığmayacak metin gitmesin. */
const CONTENT_LIMIT = 8000;
const PROMPT_LIMIT = 4000;
const NOTE_LIMIT = 1000;

const clip = (value: string | undefined | null, limit: number): string | null => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.length > limit ? `${trimmed.slice(0, limit - 1)}…` : trimmed;
};

export interface AiContentReportInput {
  surface: AiSurface;
  reason: AiReportReason;
  /** Bildirilen AI yanıtı. */
  content: string;
  /** Varsa kullanıcının bu yanıtı doğuran sorusu/seçtiği metin. */
  prompt?: string;
  /** Kullanıcının serbest açıklaması. */
  note?: string;
}

export class NotSignedInError extends Error {
  constructor() {
    super('Bildirim göndermek için oturum açmanız gerekir.');
    this.name = 'NotSignedInError';
  }
}

/**
 * Bildirimi kaydeder. Oturum yoksa `NotSignedInError`, sunucu hatasında ise
 * Supabase hatasını fırlatır — çağıran tarafın kullanıcıya geri bildirmesi için.
 */
export async function submitAiContentReport(input: AiContentReportInput): Promise<void> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) throw new NotSignedInError();

  const reportedContent = clip(input.content, CONTENT_LIMIT);
  if (!reportedContent) throw new Error('Bildirilecek bir yanıt bulunamadı.');

  const { error } = await supabase.from('ai_content_reports').insert({
    user_id: userId,
    surface: input.surface,
    reason: input.reason,
    reported_content: reportedContent,
    user_prompt: clip(input.prompt, PROMPT_LIMIT),
    note: clip(input.note, NOTE_LIMIT),
  });

  if (error) throw error;
}
