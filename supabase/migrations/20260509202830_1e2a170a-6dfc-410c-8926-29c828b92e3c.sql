CREATE OR REPLACE FUNCTION public.set_dashboard_user_status(p_user_id uuid, p_status_tabs jsonb)
RETURNS public.dashboard_users
LANGUAGE plpgsql
VOLATILE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  updated_user public.dashboard_users;
BEGIN
  UPDATE public.dashboard_users
  SET status_tabs = COALESCE(p_status_tabs, '{}'::jsonb)
  WHERE id = p_user_id
  RETURNING * INTO updated_user;

  RETURN updated_user;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_dashboard_user(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.dashboard_users
  WHERE id = p_user_id;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_dashboard_users(p_user_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  DELETE FROM public.dashboard_users
  WHERE id = ANY(p_user_ids);

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;