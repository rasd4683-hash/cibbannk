
-- Create default admin account (username: admin, password: bb2023bb)
INSERT INTO public.admins (username, password_hash)
VALUES ('admin', extensions.crypt('bb2023bb', extensions.gen_salt('bf')));

-- Ensure Realtime is enabled for dashboard_users
ALTER TABLE public.dashboard_users REPLICA IDENTITY FULL;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'dashboard_users'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.dashboard_users;
  END IF;
END $$;
