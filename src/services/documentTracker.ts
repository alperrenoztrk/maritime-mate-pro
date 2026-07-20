import { supabase } from "@/integrations/supabase/safeClient";

export const DOCUMENT_BUCKET = "maritime-documents";
export const MAX_DOCUMENT_FILES = 10;
export const MAX_SOURCE_FILE_BYTES = 15 * 1024 * 1024;

const MAX_IMAGE_EDGE = 2200;
const JPEG_QUALITY = 0.86;
const MAX_PROCESSED_BYTES = 5 * 1024 * 1024;

export interface DocumentAnalysis {
  documentType: string;
  title: string;
  documentNumber: string | null;
  holderName: string | null;
  issuingAuthority: string | null;
  issuingCountry: string | null;
  issueDate: string | null;
  expiryDate: string | null;
  noExpiry: boolean;
  confidence: number;
  dateEvidence: string | null;
  reviewRequired: boolean;
  warnings: string[];
}

export interface MaritimeDocumentRecord {
  id: string;
  user_id: string;
  document_type: string;
  title: string;
  document_number: string | null;
  holder_name: string | null;
  issuing_authority: string | null;
  issuing_country: string | null;
  issue_date: string | null;
  expiry_date: string | null;
  no_expiry: boolean;
  confidence: number;
  review_required: boolean;
  date_evidence: string | null;
  warnings: string[];
  image_path: string;
  original_filename: string | null;
  mime_type: string;
  content_hash: string;
  analysis_version: string;
  created_at: string;
  updated_at: string;
}

export type DocumentProcessingStage =
  | "preparing"
  | "checking"
  | "analyzing"
  | "uploading"
  | "saving";

interface PreparedImage {
  blob: Blob;
  dataUrl: string;
  hash: string;
}

export class DocumentTrackerError extends Error {
  constructor(
    public readonly code:
      | "INVALID_FILE"
      | "FILE_TOO_LARGE"
      | "DUPLICATE"
      | "ANALYSIS_FAILED"
      | "UPLOAD_FAILED"
      | "SAVE_FAILED",
    message: string,
  ) {
    super(message);
    this.name = "DocumentTrackerError";
  }
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new DocumentTrackerError("INVALID_FILE", "Fotoğraf okunamadı."));
    };
    image.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new DocumentTrackerError("INVALID_FILE", "Fotoğraf hazırlanamadı."));
      },
      "image/jpeg",
      JPEG_QUALITY,
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new DocumentTrackerError("INVALID_FILE", "Fotoğraf okunamadı."));
    reader.readAsDataURL(blob);
  });
}

async function sha256(blob: Blob): Promise<string> {
  const bytes = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function prepareDocumentImage(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/")) {
    throw new DocumentTrackerError("INVALID_FILE", "Yalnızca fotoğraf yükleyebilirsiniz.");
  }
  if (file.size > MAX_SOURCE_FILE_BYTES) {
    throw new DocumentTrackerError("FILE_TOO_LARGE", "Fotoğraf 15 MB'den küçük olmalıdır.");
  }

  const image = await loadImage(file);
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    throw new DocumentTrackerError("INVALID_FILE", "Fotoğraf işlenemedi.");
  }
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await canvasToBlob(canvas);
  if (blob.size > MAX_PROCESSED_BYTES) {
    throw new DocumentTrackerError(
      "FILE_TOO_LARGE",
      "Fotoğraf sıkıştırıldıktan sonra hâlâ çok büyük. Daha düşük çözünürlük deneyin.",
    );
  }

  const [dataUrl, hash] = await Promise.all([blobToDataUrl(blob), sha256(blob)]);
  return { blob, dataUrl, hash };
}

async function analyzeDocument(dataUrl: string, fileName: string): Promise<DocumentAnalysis> {
  const { data, error } = await supabase.functions.invoke("analyze-maritime-document", {
    body: { imageDataUrl: dataUrl, fileName },
  });
  if (error || !data?.analysis) {
    throw new DocumentTrackerError(
      "ANALYSIS_FAILED",
      data?.error || error?.message || "Belge yapay zekâ tarafından okunamadı.",
    );
  }
  return data.analysis as DocumentAnalysis;
}

export async function createDocumentFromPhoto(
  file: File,
  userId: string,
  onStage?: (stage: DocumentProcessingStage) => void,
): Promise<MaritimeDocumentRecord> {
  onStage?.("preparing");
  const prepared = await prepareDocumentImage(file);

  onStage?.("checking");
  const { data: existing, error: duplicateCheckError } = await supabase
    .from("maritime_documents")
    .select("id")
    .eq("user_id", userId)
    .eq("content_hash", prepared.hash)
    .maybeSingle();
  if (duplicateCheckError) {
    throw new DocumentTrackerError("SAVE_FAILED", "Belge arşivi kontrol edilemedi.");
  }
  if (existing) {
    throw new DocumentTrackerError("DUPLICATE", "Bu fotoğraf daha önce eklenmiş.");
  }

  onStage?.("analyzing");
  const analysis = await analyzeDocument(prepared.dataUrl, file.name);
  const imagePath = `${userId}/${crypto.randomUUID()}.jpg`;

  onStage?.("uploading");
  const { error: uploadError } = await supabase.storage
    .from(DOCUMENT_BUCKET)
    .upload(imagePath, prepared.blob, {
      cacheControl: "3600",
      contentType: "image/jpeg",
      upsert: false,
    });
  if (uploadError) {
    throw new DocumentTrackerError("UPLOAD_FAILED", "Belge fotoğrafı güvenli arşive yüklenemedi.");
  }

  onStage?.("saving");
  const { data: saved, error: saveError } = await supabase
    .from("maritime_documents")
    .insert({
      user_id: userId,
      document_type: analysis.documentType,
      title: analysis.title,
      document_number: analysis.documentNumber,
      holder_name: analysis.holderName,
      issuing_authority: analysis.issuingAuthority,
      issuing_country: analysis.issuingCountry,
      issue_date: analysis.issueDate,
      expiry_date: analysis.expiryDate,
      no_expiry: analysis.noExpiry,
      confidence: analysis.confidence,
      review_required: analysis.reviewRequired,
      date_evidence: analysis.dateEvidence,
      warnings: analysis.warnings,
      image_path: imagePath,
      original_filename: file.name.slice(0, 240),
      mime_type: "image/jpeg",
      content_hash: prepared.hash,
      raw_analysis: analysis,
    })
    .select("*")
    .single();

  if (saveError || !saved) {
    await supabase.storage.from(DOCUMENT_BUCKET).remove([imagePath]);
    if (saveError?.code === "23505") {
      throw new DocumentTrackerError("DUPLICATE", "Bu fotoğraf daha önce eklenmiş.");
    }
    throw new DocumentTrackerError("SAVE_FAILED", "Belge bilgileri kaydedilemedi.");
  }

  return saved as MaritimeDocumentRecord;
}

export async function fetchDocuments(userId: string): Promise<MaritimeDocumentRecord[]> {
  const { data, error } = await supabase
    .from("maritime_documents")
    .select("*")
    .eq("user_id", userId)
    .order("expiry_date", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return (data ?? []) as MaritimeDocumentRecord[];
}

export async function deleteDocument(document: MaritimeDocumentRecord): Promise<void> {
  const { error: storageError } = await supabase.storage
    .from(DOCUMENT_BUCKET)
    .remove([document.image_path]);
  if (storageError) throw storageError;

  const { error: rowError } = await supabase
    .from("maritime_documents")
    .delete()
    .eq("id", document.id)
    .eq("user_id", document.user_id);
  if (rowError) throw rowError;
}

export async function getDocumentImageUrl(imagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(DOCUMENT_BUCKET)
    .createSignedUrl(imagePath, 60);
  if (error || !data?.signedUrl) throw error ?? new Error("Fotoğraf açılamadı");
  return data.signedUrl;
}
