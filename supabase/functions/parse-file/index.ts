import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "../_shared/cors.ts";
import { validateAuth, unauthorizedResponse, errorResponse, logError, GENERIC_ERRORS } from "../_shared/auth.ts";
import { assertSafeUrl } from "../_shared/ssrf.ts";

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Validate authentication
  const { user, error: authError } = await validateAuth(req);
  if (authError || !user) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const { fileUrl, fileName, fileType } = await req.json();

    if (!fileUrl) {
      return new Response(
        JSON.stringify({ error: 'fileUrl gerekli' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // SSRF protection: only allow http(s) URLs on public hosts
    try {
      await assertSafeUrl(fileUrl);
    } catch {
      return errorResponse(corsHeaders, 400, 'Geçersiz veya izin verilmeyen dosya URL');
    }

    // Fetch the file content
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      return errorResponse(corsHeaders, 400, 'Dosya indirilemedi');
    }

    let extractedContent = '';
    let extractedData: Record<string, unknown> | null = null;

    // Handle different file types
    if (fileType.includes('text/') || fileType === 'application/json') {
      extractedContent = await fileResponse.text();
      
      if (fileType === 'application/json') {
        try {
          extractedData = JSON.parse(extractedContent);
        } catch {
          // Keep as text if JSON parse fails
        }
      }
    } else if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
      const text = await fileResponse.text();
      extractedContent = text;
      extractedData = parseCSV(text);
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel') || 
               fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      extractedContent = `[Excel dosyası: ${fileName}]\nBu dosya bir Excel tablosudur. İçeriğini görüntülemek için dosyayı CSV formatına dönüştürmeniz önerilir.`;
      extractedData = { type: 'excel', fileName, needsConversion: true };
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      const arrayBuffer = await fileResponse.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      extractedContent = extractPDFText(uint8Array, fileName);
      extractedData = { type: 'pdf', fileName, size: uint8Array.length };
    } else if (fileType.includes('word') || fileType.includes('document') ||
               fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      extractedContent = `[Word dosyası: ${fileName}]\nBu dosya bir Word belgesidir.`;
      extractedData = { type: 'word', fileName };
    } else if (fileType.startsWith('image/')) {
      extractedContent = `[Görsel: ${fileName}]\nTür: ${fileType}\nBu dosya bir görseldir.`;
      extractedData = { type: 'image', fileName, mimeType: fileType };
    } else {
      extractedContent = `[Dosya: ${fileName}]\nBu dosya türü doğrudan okunamıyor.`;
      extractedData = { type: 'unknown', fileName, mimeType: fileType };
    }

    // Limit content length for AI context
    const maxLength = 15000;
    if (extractedContent.length > maxLength) {
      extractedContent = extractedContent.substring(0, maxLength) + '\n\n[...içerik kırpıldı]';
    }

    return new Response(
      JSON.stringify({ 
        content: extractedContent, 
        data: extractedData,
        fileName,
        fileType,
        success: true 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    logError('parse-file', error);
    return errorResponse(corsHeaders, 500, 'Dosya işlenemedi');
  }
});

function parseCSV(text: string): { headers: string[]; rows: string[][]; summary: string } {
  const lines = text.trim().split('\n');
  if (lines.length === 0) {
    return { headers: [], rows: [], summary: 'Boş CSV dosyası' };
  }

  const headers = lines[0].split(/[,;\t]/).map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows = lines.slice(1, 21).map(line =>
    line.split(/[,;\t]/).map(cell => cell.trim().replace(/^["']|["']$/g, ''))
  );

  return {
    headers,
    rows,
    summary: `${headers.length} sütun, ${lines.length - 1} satır`
  };
}

function extractPDFText(uint8Array: Uint8Array, fileName: string): string {
  try {
    const text = new TextDecoder('latin1').decode(uint8Array);
    
    const textMatches: string[] = [];
    const streamRegex = /stream[\r\n]+([\s\S]*?)endstream/g;
    let match;
    
    while ((match = streamRegex.exec(text)) !== null && textMatches.length < 10) {
      const streamContent = match[1];
      const textOpRegex = /\(([^)]+)\)\s*Tj|\[([^\]]+)\]\s*TJ/g;
      let textMatch;
      while ((textMatch = textOpRegex.exec(streamContent)) !== null) {
        const extracted = textMatch[1] || textMatch[2];
        if (extracted && extracted.length > 2) {
          const cleaned = extracted
            .replace(/\\[0-9]{3}/g, '')
            .replace(/\\n|\\r|\\t/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (cleaned.length > 3 && /[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ]/.test(cleaned)) {
            textMatches.push(cleaned);
          }
        }
      }
    }
    
    if (textMatches.length > 0) {
      return `[PDF: ${fileName}]\n\nÇıkarılan metin:\n${textMatches.join('\n').substring(0, 10000)}`;
    }
    
    return `[PDF: ${fileName}]\nBu PDF dosyasından metin çıkarılamadı.`;
  } catch {
    return `[PDF: ${fileName}]\nPDF dosyası işlenirken hata oluştu.`;
  }
}
