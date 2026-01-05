import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileUrl, fileName, fileType } = await req.json();

    if (!fileUrl) {
      return new Response(
        JSON.stringify({ error: 'fileUrl gerekli' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Parsing file: ${fileName} (${fileType})`);

    // Fetch the file content
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Dosya indirilemedi: ${fileResponse.status}`);
    }

    let extractedContent = '';
    let extractedData: Record<string, unknown> | null = null;

    // Handle different file types
    if (fileType.includes('text/') || fileType === 'application/json') {
      // Plain text files
      extractedContent = await fileResponse.text();
      
      if (fileType === 'application/json') {
        try {
          extractedData = JSON.parse(extractedContent);
        } catch {
          // Keep as text if JSON parse fails
        }
      }
    } else if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
      // CSV files
      const text = await fileResponse.text();
      extractedContent = text;
      extractedData = parseCSV(text);
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel') || 
               fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      // Excel files - extract text representation
      // Note: Full Excel parsing would require a library, we'll provide basic info
      extractedContent = `[Excel dosyası: ${fileName}]\nBu dosya bir Excel tablosudur. İçeriğini görüntülemek için dosyayı CSV formatına dönüştürmeniz önerilir.`;
      extractedData = { type: 'excel', fileName, needsConversion: true };
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // PDF files - provide metadata
      // Note: Full PDF parsing would require pdfjs, we'll extract basic info
      const arrayBuffer = await fileResponse.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Try to extract some text from PDF (basic extraction)
      extractedContent = extractPDFText(uint8Array, fileName);
      extractedData = { type: 'pdf', fileName, size: uint8Array.length };
    } else if (fileType.includes('word') || fileType.includes('document') ||
               fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
      // Word documents
      extractedContent = `[Word dosyası: ${fileName}]\nBu dosya bir Word belgesidir.`;
      extractedData = { type: 'word', fileName };
    } else if (fileType.startsWith('image/')) {
      // Images - describe the image
      extractedContent = `[Görsel: ${fileName}]\nTür: ${fileType}\nBu dosya bir görseldir. Görsel analizi için AI modeli kullanılabilir.`;
      extractedData = { type: 'image', fileName, mimeType: fileType };
    } else {
      // Unknown file type - provide basic info
      extractedContent = `[Dosya: ${fileName}]\nTür: ${fileType}\nBu dosya türü doğrudan okunamıyor.`;
      extractedData = { type: 'unknown', fileName, mimeType: fileType };
    }

    // Limit content length for AI context (max ~15000 chars)
    const maxLength = 15000;
    if (extractedContent.length > maxLength) {
      extractedContent = extractedContent.substring(0, maxLength) + '\n\n[...içerik kırpıldı]';
    }

    console.log(`Extracted ${extractedContent.length} characters from ${fileName}`);

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
    console.error('Parse error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Dosya işlenemedi',
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseCSV(text: string): { headers: string[]; rows: string[][]; summary: string } {
  const lines = text.trim().split('\n');
  if (lines.length === 0) {
    return { headers: [], rows: [], summary: 'Boş CSV dosyası' };
  }

  const headers = lines[0].split(/[,;\t]/).map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows = lines.slice(1, 21).map(line => // First 20 rows only
    line.split(/[,;\t]/).map(cell => cell.trim().replace(/^["']|["']$/g, ''))
  );

  return {
    headers,
    rows,
    summary: `${headers.length} sütun, ${lines.length - 1} satır`
  };
}

function extractPDFText(uint8Array: Uint8Array, fileName: string): string {
  // Basic PDF text extraction - looks for text streams
  // This is a simplified version; production would use pdf.js
  try {
    const text = new TextDecoder('latin1').decode(uint8Array);
    
    // Look for text between stream and endstream
    const textMatches: string[] = [];
    const streamRegex = /stream[\r\n]+([\s\S]*?)endstream/g;
    let match;
    
    while ((match = streamRegex.exec(text)) !== null && textMatches.length < 10) {
      const streamContent = match[1];
      // Look for text operators (Tj, TJ, ')
      const textOpRegex = /\(([^)]+)\)\s*Tj|\[([^\]]+)\]\s*TJ/g;
      let textMatch;
      while ((textMatch = textOpRegex.exec(streamContent)) !== null) {
        const extracted = textMatch[1] || textMatch[2];
        if (extracted && extracted.length > 2) {
          // Clean up the text
          const cleaned = extracted
            .replace(/\\[0-9]{3}/g, '') // Remove octal escapes
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
    
    return `[PDF: ${fileName}]\nBu PDF dosyasından metin çıkarılamadı. Dosya taranmış görüntüler içeriyor olabilir.`;
  } catch {
    return `[PDF: ${fileName}]\nPDF dosyası işlenirken hata oluştu.`;
  }
}
