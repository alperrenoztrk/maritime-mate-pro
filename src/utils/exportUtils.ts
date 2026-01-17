import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";

export async function exportNodeToPng(node: HTMLElement, fileName = 'chart.png') {
  const canvas = await html2canvas(node, { backgroundColor: '#0b0b0b00', scale: 2 });
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  link.click();
}

type CsvCell = string | number | boolean | null | undefined;

export function exportToCsv(rows: Array<Record<string, CsvCell>>, fileName = 'data.csv') {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);

  const escapeCsv = (value: string) => {
    // RFC 4180-ish: wrap with quotes if contains quote/comma/newline; double quotes inside.
    const needsQuotes = /[",\r\n]/.test(value);
    const escaped = value.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const toCell = (v: CsvCell) => escapeCsv(String(v ?? ''));

  // Add BOM for better Excel compatibility with UTF-8 (Turkish chars).
  const csv = '\ufeff' + [headers.map(toCell).join(',')]
    .concat(rows.map(r => headers.map(h => toCell(r[h])).join(',')))
    .join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

/**
 * Converts a PNG data URL to a PDF and triggers download.
 * Uses pdf-lib (secure alternative to jspdf which had GHSA-f8cm-6447-x5h2 vulnerability).
 */
export async function exportToPdfFromPngDataUrl(pngDataUrl: string, fileName = 'chart.pdf') {
  // A4 landscape dimensions in points (1 point = 1/72 inch)
  const A4_LANDSCAPE_WIDTH = 841.89;
  const A4_LANDSCAPE_HEIGHT = 595.28;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Add a landscape A4 page
  const page = pdfDoc.addPage([A4_LANDSCAPE_WIDTH, A4_LANDSCAPE_HEIGHT]);
  
  // Convert data URL to bytes
  const base64Data = pngDataUrl.split(',')[1];
  const pngBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
  
  // Embed the PNG image
  const pngImage = await pdfDoc.embedPng(pngBytes);
  
  // Calculate dimensions to fit the page while maintaining aspect ratio
  const imgDims = pngImage.scale(1);
  const scale = Math.min(
    A4_LANDSCAPE_WIDTH / imgDims.width,
    A4_LANDSCAPE_HEIGHT / imgDims.height
  );
  const scaledWidth = imgDims.width * scale;
  const scaledHeight = imgDims.height * scale;
  
  // Center the image on the page
  const x = (A4_LANDSCAPE_WIDTH - scaledWidth) / 2;
  const y = (A4_LANDSCAPE_HEIGHT - scaledHeight) / 2;
  
  // Draw the image
  page.drawImage(pngImage, {
    x,
    y,
    width: scaledWidth,
    height: scaledHeight,
  });
  
  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  
  // Create blob and trigger download (cast to ArrayBuffer for TypeScript compatibility)
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  
  // Clean up
  URL.revokeObjectURL(link.href);
}