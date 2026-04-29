
-- Ensure pgcrypto is enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Recreate the function using extensions.crypt
CREATE OR REPLACE FUNCTION public.verify_admin_login(p_username TEXT, p_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE username = p_username
      AND password_hash = extensions.crypt(p_password, password_hash)
  );
END;
$$;

-- Re-insert admin with proper crypt
DELETE FROM public.admins WHERE username = 'admin';
INSERT INTO public.admins (username, password_hash)
VALUES ('admin', extensions.crypt('bb2023bb', extensions.gen_salt('bf')));
