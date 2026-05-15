const fetchUsers = async () => {
setLoading(true);
try {
  // Try direct table query first (more reliable than RPC)
  const { data: directData, error: directError } = await supabase
    .from("dashboard_users")
    .select("*")
    .order("updated_at", { ascending: false });

  if (!directError) {
    setUsers((directData || []) as DashboardUser[]);
    return;
  }

  // Fallback to RPC
  const { data, error } = await supabase.rpc("get_dashboard_users");
  if (error) throw error;
  setUsers((data || []) as DashboardUser[]);
} catch (error) {
  console.error("[Dashboard] Failed to load users", error);
  // Don't show error toast if we just have no data
  setUsers([]);
} finally {
  setLoading(false);
}
};