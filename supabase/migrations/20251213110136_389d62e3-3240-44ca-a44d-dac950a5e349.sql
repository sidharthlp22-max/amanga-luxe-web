-- Drop trigger first
DROP TRIGGER IF EXISTS update_media_updated_at ON public.media;

-- Drop function
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Drop storage policies
DROP POLICY IF EXISTS "Media files are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Allow media uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow media updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow media deletes" ON storage.objects;

-- Drop RLS policy on media table
DROP POLICY IF EXISTS "Media is publicly readable" ON public.media;

-- Drop media table
DROP TABLE IF EXISTS public.media;

-- Delete storage bucket
DELETE FROM storage.buckets WHERE id = 'media';