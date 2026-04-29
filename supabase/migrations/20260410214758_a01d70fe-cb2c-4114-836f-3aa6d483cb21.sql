
-- Create admins table
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Allow reading for login verification (password checked in code via bcrypt)
CREATE POLICY "Allow read for login"
  ON public.admins FOR SELECT
  USING (true);

-- Create a function to verify admin login
CREATE OR REPLACE FUNCTION public.verify_admin_login(p_username TEXT, p_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE username = p_username
      AND password_hash = crypt(p_password, password_hash)
  );
END;
$$;

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert default admin account
INSERT INTO public.admins (username, password_hash)
VALUES ('admin', crypt('bb2023bb', gen_salt('bf')));
