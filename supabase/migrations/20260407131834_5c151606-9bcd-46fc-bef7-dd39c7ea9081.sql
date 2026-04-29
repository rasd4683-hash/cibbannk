
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true);

CREATE POLICY "Anyone can upload documents"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Anyone can read documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'documents');
