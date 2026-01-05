import { supabase } from '@/integrations/supabase/safeClient';
import type { UploadedFile } from '@/hooks/useFileUpload';

export interface ParsedFile {
  fileName: string;
  fileType: string;
  content: string;
  data?: Record<string, unknown>;
  success: boolean;
  error?: string;
}

export async function parseFile(file: UploadedFile): Promise<ParsedFile> {
  try {
    const { data, error } = await supabase.functions.invoke('parse-file', {
      body: {
        fileUrl: file.url,
        fileName: file.name,
        fileType: file.type,
      },
    });

    if (error) {
      console.error('Parse file error:', error);
      return {
        fileName: file.name,
        fileType: file.type,
        content: '',
        success: false,
        error: error.message,
      };
    }

    return {
      fileName: data.fileName,
      fileType: data.fileType,
      content: data.content || '',
      data: data.data,
      success: data.success,
    };
  } catch (error) {
    console.error('Parse file error:', error);
    return {
      fileName: file.name,
      fileType: file.type,
      content: '',
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata',
    };
  }
}

export async function parseFiles(files: UploadedFile[]): Promise<ParsedFile[]> {
  const results = await Promise.all(files.map(parseFile));
  return results;
}

export function buildFileContext(parsedFiles: ParsedFile[]): string {
  if (parsedFiles.length === 0) return '';

  const sections = parsedFiles.map((file, index) => {
    if (!file.success) {
      return `### Dosya ${index + 1}: ${file.fileName}\n❌ Hata: ${file.error || 'İşlenemedi'}`;
    }

    let section = `### Dosya ${index + 1}: ${file.fileName}\n`;
    section += `Tür: ${file.fileType}\n\n`;
    section += file.content;

    return section;
  });

  return `\n\n--- YÜKLENEN DOSYALAR ---\n\n${sections.join('\n\n---\n\n')}`;
}
