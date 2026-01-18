import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/safeClient';
import { toast } from 'sonner';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  path: string;
}

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB

export function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Dosya boyutu 30MB'ı aşamaz: ${file.name}`);
      return null;
    }

    setIsUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Dosya yüklemek için giriş yapmalısınız');
        setIsUploading(false);
        return null;
      }

      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `${user.id}/${timestamp}_${sanitizedName}`;

      const { error: uploadError } = await supabase.storage
        .from('agent-uploads')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error(`Yükleme başarısız: ${uploadError.message}`);
        setIsUploading(false);
        return null;
      }

      // Use signed URL for private bucket (1 hour expiry)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('agent-uploads')
        .createSignedUrl(filePath, 3600);

      if (signedUrlError || !signedUrlData) {
        console.error('Signed URL error:', signedUrlError);
        toast.error('Dosya URL\'i oluşturulamadı');
        setIsUploading(false);
        return null;
      }

      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: signedUrlData.signedUrl,
        path: filePath,
      };
      setUploadedFiles(prev => [...prev, uploadedFile]);
      setIsUploading(false);
      return uploadedFile;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Dosya yüklenirken bir hata oluştu');
      setIsUploading(false);
      return null;
    }
  }, []);

  const uploadFiles = useCallback(async (files: FileList | File[]): Promise<UploadedFile[]> => {
    const fileArray = Array.from(files);
    const results: UploadedFile[] = [];

    for (const file of fileArray) {
      const result = await uploadFile(file);
      if (result) {
        results.push(result);
      }
    }

    if (results.length > 0) {
      toast.success(`${results.length} dosya yüklendi`);
    }

    return results;
  }, [uploadFile]);

  const removeFile = useCallback(async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    try {
      await supabase.storage.from('agent-uploads').remove([file.path]);
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Remove error:', error);
    }
  }, [uploadedFiles]);

  const clearFiles = useCallback(() => {
    setUploadedFiles([]);
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }, []);

  return {
    uploadedFiles,
    isUploading,
    uploadFile,
    uploadFiles,
    removeFile,
    clearFiles,
    formatFileSize,
  };
}
