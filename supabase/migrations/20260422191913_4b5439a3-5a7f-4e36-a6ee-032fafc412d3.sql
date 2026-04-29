ALTER TABLE public.dashboard_users REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.dashboard_users;