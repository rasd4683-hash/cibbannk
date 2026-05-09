CREATE OR REPLACE FUNCTION public.get_dashboard_users()
RETURNS SETOF public.dashboard_users
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT *
  FROM public.dashboard_users
  ORDER BY created_at DESC;
$$;