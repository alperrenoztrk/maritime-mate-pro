-- Create storage bucket for agent file uploads (30MB max)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'agent-uploads',
  'agent-uploads', 
  false,
  31457280, -- 30MB in bytes
  NULL -- Accept all file types
);

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload files to agent-uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'agent-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read their own files
CREATE POLICY "Users can read own files in agent-uploads"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'agent-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete own files in agent-uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'agent-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);